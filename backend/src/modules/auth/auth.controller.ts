import { Body, Controller, Post, BadRequestException } from "@nestjs/common";
import { AuthService } from "./auth.service";

class RegisterDto {
  name!: string;
  cpf!: string;
  email!: string;
  password!: string;
  passwordConfirmation!: string;
}

class LoginDto {
  email!: string;
  password!: string;
}

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

    try {
      return await this.authService.register({
        name: body.name,
        cpf: body.cpf,
        email: body.email,
        password: body.password,
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
}
