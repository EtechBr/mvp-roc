import { Body, Controller, Post } from "@nestjs/common";
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
  register(@Body() body: RegisterDto) {
    if (
      !body.name ||
      !body.cpf ||
      !body.email ||
      !body.password ||
      !body.passwordConfirmation
    ) {
      throw new Error("Todos os campos são obrigatórios");
    }

    if (body.password !== body.passwordConfirmation) {
      throw new Error("As senhas não conferem");
    }

    return this.authService.register({
      name: body.name,
      cpf: body.cpf,
      email: body.email,
      password: body.password
    });
  }

  @Post("login")
  login(@Body() body: LoginDto) {
    if (!body.email || !body.password) {
      throw new Error("E-mail e senha são obrigatórios");
    }

    return this.authService.login({
      email: body.email,
      password: body.password
    });
  }
}

