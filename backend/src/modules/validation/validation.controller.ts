import { Body, Controller, Post, BadRequestException } from "@nestjs/common";
import { ValidationService } from "./validation.service";

class ValidateVoucherDto {
  cpf?: string;
  code!: string;
}

@Controller("validation")
export class ValidationController {
  constructor(private readonly validationService: ValidationService) {}

  @Post()
  async validate(@Body() body: ValidateVoucherDto) {
    if (!body.code) {
      throw new BadRequestException("Código do voucher é obrigatório");
    }

    // Se CPF fornecido, usar validação com usuário
    if (body.cpf) {
      return this.validationService.validateVoucher({
        cpf: body.cpf,
        code: body.code,
      });
    }

    // Caso contrário, validar apenas por código (para uso em restaurantes)
    return this.validationService.validateVoucherByCode(body.code);
  }
}
