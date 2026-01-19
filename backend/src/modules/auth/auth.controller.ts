import { Body, Controller, Post, Get, Put, BadRequestException, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PasswordResetService } from "./password-reset.service";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { Address } from "../users/users.service";
import { ConfigService } from "@nestjs/config";

class AddressDto {
  cep!: string;
  street!: string;
  number!: string;
  complement?: string;
  neighborhood!: string;
  city!: string;
  state!: string;
}

class RegisterDto {
  name!: string;
  cpf!: string;
  email!: string;
  password!: string;
  passwordConfirmation!: string;
  address?: AddressDto;
}

class LoginDto {
  email!: string;
  password!: string;
}

class UpdateProfileDto {
  full_name?: string;
  phone?: string;
  address?: AddressDto;
}

class ForgotPasswordDto {
  email!: string;
}

class ResetPasswordDto {
  token!: string;
  password!: string;
  passwordConfirmation!: string;
}

class ValidateTokenDto {
  token!: string;
}

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly passwordResetService: PasswordResetService,
    private readonly configService: ConfigService
  ) {}

  @Post("register")
  async register(@Body() body: RegisterDto) {
    if (
      !body.name ||
      !body.cpf ||
      !body.email ||
      !body.password ||
      !body.passwordConfirmation
    ) {
      throw new BadRequestException("Todos os campos são obrigatórios");
    }

    if (body.password !== body.passwordConfirmation) {
      throw new BadRequestException("As senhas não conferem");
    }

    if (body.password.length < 6) {
      throw new BadRequestException("A senha deve ter pelo menos 6 caracteres");
    }

    // Validar endereço se fornecido
    let address: Address | undefined;
    if (body.address) {
      if (!body.address.cep || !body.address.street || !body.address.number ||
          !body.address.neighborhood || !body.address.city || !body.address.state) {
        throw new BadRequestException("Endereço incompleto");
      }
      address = body.address;
    }

    try {
      return await this.authService.register({
        name: body.name,
        cpf: body.cpf,
        email: body.email,
        password: body.password,
        address,
      });
    } catch (error: any) {
      if (error.status) {
        throw error;
      }
      throw new BadRequestException(error.message || "Erro ao criar conta");
    }
  }

  @Post("login")
  async login(@Body() body: LoginDto) {
    if (!body.email || !body.password) {
      throw new BadRequestException("E-mail e senha são obrigatórios");
    }

    return this.authService.login({
      email: body.email,
      password: body.password,
    });
  }

  @Post("forgot-password")
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    if (!body.email) {
      throw new BadRequestException("E-mail é obrigatório");
    }

    const result = await this.passwordResetService.createResetToken(body.email);

    // Sempre retorna sucesso para não revelar se o email existe
    if (result) {
      // Aqui você pode integrar com um serviço de email (SendGrid, AWS SES, etc.)
      // Por enquanto, vamos apenas logar o token para desenvolvimento
      const frontendUrl = this.configService.get<string>("FRONTEND_URL") || "http://localhost:3000";
      const resetUrl = `${frontendUrl}/auth/reset-password?token=${result.token}`;

      console.log("=== RESET PASSWORD ===");
      console.log(`Usuário: ${result.userName}`);
      console.log(`Email: ${body.email}`);
      console.log(`Link de reset: ${resetUrl}`);
      console.log("======================");

      // TODO: Enviar email com o link de reset
      // await this.emailService.sendPasswordResetEmail(body.email, result.userName, resetUrl);
    }

    return {
      success: true,
      message: "Se o e-mail existir em nossa base, você receberá instruções para redefinir sua senha.",
    };
  }

  @Post("validate-reset-token")
  async validateResetToken(@Body() body: ValidateTokenDto) {
    if (!body.token) {
      throw new BadRequestException("Token é obrigatório");
    }

    const isValid = await this.passwordResetService.validateResetToken(body.token);

    return {
      valid: !!isValid,
    };
  }

  @Post("reset-password")
  async resetPassword(@Body() body: ResetPasswordDto) {
    if (!body.token || !body.password || !body.passwordConfirmation) {
      throw new BadRequestException("Todos os campos são obrigatórios");
    }

    if (body.password !== body.passwordConfirmation) {
      throw new BadRequestException("As senhas não conferem");
    }

    if (body.password.length < 6) {
      throw new BadRequestException("A senha deve ter pelo menos 6 caracteres");
    }

    await this.passwordResetService.resetPassword(body.token, body.password);

    return {
      success: true,
      message: "Senha redefinida com sucesso! Você já pode fazer login com sua nova senha.",
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  async getProfile(@Request() req: any) {
    return this.authService.getProfile(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put("profile")
  async updateProfile(@Request() req: any, @Body() body: UpdateProfileDto) {
    // Validar endereço se fornecido
    let address: Address | undefined;
    if (body.address) {
      if (!body.address.cep || !body.address.street || !body.address.number ||
          !body.address.neighborhood || !body.address.city || !body.address.state) {
        throw new BadRequestException("Endereço incompleto");
      }
      address = body.address;
    }

    return this.authService.updateProfile(req.user.id, {
      full_name: body.full_name,
      phone: body.phone,
      address,
    });
  }
}
