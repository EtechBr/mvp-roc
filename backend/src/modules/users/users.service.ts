import { Injectable, Inject, NotFoundException, ConflictException } from "@nestjs/common";
import { SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_CLIENT } from "../../config/supabase.config";
import * as bcrypt from "bcrypt";

export interface Profile {
  id: string;
  user_id: string | null;
  full_name: string | null;
  email: string | null;
  cpf: string | null;
  city: string | null;
  created_at: string;
  updated_at: string;
  password_hash?: string;
}

export interface CreateUserInput {
  name: string;
  cpf: string;
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  constructor(
    @Inject(SUPABASE_CLIENT) private readonly supabase: SupabaseClient
  ) {}

  async createUser(input: CreateUserInput): Promise<Profile> {
    // Verificar se já existe usuário com mesmo email ou CPF
    const { data: existingByEmail } = await this.supabase
      .from("profiles")
      .select("id")
      .eq("email", input.email)
      .single();

    if (existingByEmail) {
      throw new ConflictException("Usuário com este e-mail já existe");
    }

    const { data: existingByCpf } = await this.supabase
      .from("profiles")
      .select("id")
      .eq("cpf", input.cpf)
      .single();

    if (existingByCpf) {
      throw new ConflictException("Usuário com este CPF já existe");
    }

    // Hash da senha com bcrypt
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(input.password, saltRounds);

    // Criar profile
    const { data: profile, error } = await this.supabase
      .from("profiles")
      .insert({
        full_name: input.name,
        email: input.email,
        cpf: input.cpf,
        password_hash: passwordHash,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Erro ao criar usuário: ${error.message}`);
    }

    return profile;
  }

  async findByEmail(email: string): Promise<Profile | null> {
    const { data, error } = await this.supabase
      .from("profiles")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !data) {
      return null;
    }

    return data;
  }

  async findByCpf(cpf: string): Promise<Profile | null> {
    const { data, error } = await this.supabase
      .from("profiles")
      .select("*")
      .eq("cpf", cpf)
      .single();

    if (error || !data) {
      return null;
    }

    return data;
  }

  async findById(id: string): Promise<Profile> {
    const { data, error } = await this.supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      throw new NotFoundException("Usuário não encontrado");
    }

    return data;
  }

  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
