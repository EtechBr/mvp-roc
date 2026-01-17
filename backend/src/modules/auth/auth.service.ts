import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../../modules/users/users.service";

interface RegisterInput {
  name: string;
  cpf: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  register(input: RegisterInput) {
    const user = this.usersService.createUser(input);
    return {
      user: {
        id: user.id,
        name: user.name,
        cpf: user.cpf,
        email: user.email
      },
      token: `mock-token-${user.id}`
    };
  }

  login(input: LoginInput) {
    const user = this.usersService.findByEmail(input.email);

    if (!user || user.password !== input.password) {
      throw new UnauthorizedException("Credenciais inválidas");
    }

    return {
      user: {
        id: user.id,
        name: user.name,
        cpf: user.cpf,
        email: user.email
      },
      token: `mock-token-${user.id}`
    };
  }
}

