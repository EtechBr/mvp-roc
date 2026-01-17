import { Injectable, NotFoundException } from "@nestjs/common";

export interface User {
  id: number;
  name: string;
  cpf: string;
  email: string;
  password: string;
}

export interface CreateUserInput {
  name: string;
  cpf: string;
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [];
  private nextId = 1;

  createUser(input: CreateUserInput): User {
    const existing = this.users.find(
      (user) => user.email === input.email || user.cpf === input.cpf
    );

    if (existing) {
      throw new Error("Usuário com este e-mail ou CPF já existe");
    }

    const user: User = {
      id: this.nextId++,
      name: input.name,
      cpf: input.cpf,
      email: input.email,
      password: input.password
    };

    this.users.push(user);
    return user;
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }

  findByCpf(cpf: string): User | undefined {
    return this.users.find((user) => user.cpf === cpf);
  }

  findById(id: number): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }
    return user;
  }
}

