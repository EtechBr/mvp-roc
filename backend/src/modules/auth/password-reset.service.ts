import { Injectable, Inject, BadRequestException } from "@nestjs/common";
import { SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_CLIENT } from "../../config/supabase.config";
import { UsersService } from "../users/users.service";
import * as crypto from "crypto";

interface PasswordResetToken {
  id: string;
  profile_id: string;
  token: string;
  expires_at: string;
  used: boolean;
  created_at: string;
}

@Injectable()
export class PasswordResetService {
  constructor(
    @Inject(SUPABASE_CLIENT) private readonly supabase: SupabaseClient,
    private readonly usersService: UsersService
  ) {}

  // Gerar token de reset de senha
  async createResetToken(email: string): Promise<{ token: string; userName: string } | null> {
    // Buscar usuário pelo email
    const profile = await this.usersService.findByEmail(email);

    if (!profile) {
      // Retorna null silenciosamente para não revelar se o email existe
      return null;
    }

    // Invalidar tokens anteriores do usuário
    await this.supabase
      .from("password_reset_tokens")
      .update({ used: true })
      .eq("profile_id", profile.id)
      .eq("used", false);

    // Gerar token único
    const token = crypto.randomBytes(32).toString("hex");

    // Token expira em 1 hora
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();

    // Salvar token no banco
    const { error } = await this.supabase
      .from("password_reset_tokens")
      .insert({
        profile_id: profile.id,
        token: token,
        expires_at: expiresAt,
        used: false,
      });

    if (error) {
      throw new Error(`Erro ao criar token de reset: ${error.message}`);
    }

    return {
      token,
      userName: profile.full_name || "Usuário",
    };
  }

  // Validar token de reset
  async validateResetToken(token: string): Promise<PasswordResetToken | null> {
    const { data, error } = await this.supabase
      .from("password_reset_tokens")
      .select("*")
      .eq("token", token)
      .eq("used", false)
      .gt("expires_at", new Date().toISOString())
      .single();

    if (error || !data) {
      return null;
    }

    return data;
  }

  // Redefinir senha usando token
  async resetPassword(token: string, newPassword: string): Promise<void> {
    // Validar token
    const resetToken = await this.validateResetToken(token);

    if (!resetToken) {
      throw new BadRequestException("Token inválido ou expirado. Solicite um novo link de redefinição.");
    }

    // Validar senha
    if (!newPassword || newPassword.length < 6) {
      throw new BadRequestException("A senha deve ter pelo menos 6 caracteres");
    }

    // Atualizar senha do usuário
    await this.usersService.updatePassword(resetToken.profile_id, newPassword);

    // Marcar token como usado
    await this.supabase
      .from("password_reset_tokens")
      .update({ used: true })
      .eq("id", resetToken.id);
  }

  // Limpar tokens expirados (pode ser chamado via cron ou manualmente)
  async cleanupExpiredTokens(): Promise<void> {
    await this.supabase
      .from("password_reset_tokens")
      .delete()
      .or(`expires_at.lt.${new Date().toISOString()},used.eq.true`);
  }
}
