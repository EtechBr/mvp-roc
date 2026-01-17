import { Body, Controller, Post } from "@nestjs/common";
import { ValidationService } from "./validation.service";

class ValidateVoucherDto {
  cpf: string;
  code: string;
}

@Controller("validation")
export class ValidationController {
  constructor(private readonly validationService: ValidationService) {}

  @Post()
  validate(@Body() body: ValidateVoucherDto) {
    if (!body.cpf || !body.code) {
      throw new Error("CPF e código do voucher são obrigatórios");
    }

    return this.validationService.validateVoucher({
      cpf: body.cpf,
      code: body.code
    });
  }
}

