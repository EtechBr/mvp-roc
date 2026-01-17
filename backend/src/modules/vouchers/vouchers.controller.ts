import { Controller, Get, Param, Post, Req } from "@nestjs/common";
import { Request } from "express";
import { VouchersService } from "./vouchers.service";

interface AuthenticatedRequest extends Request {
  userId?: number;
}

@Controller("vouchers")
export class VouchersController {
  constructor(private readonly vouchersService: VouchersService) {}

  private getUserIdFromRequest(req: AuthenticatedRequest): number {
    const header = req.header("x-user-id");
    if (!header) {
      throw new Error("Cabeçalho x-user-id é obrigatório");
    }
    const value = Number(header);
    if (!Number.isInteger(value) || value <= 0) {
      throw new Error("x-user-id inválido");
    }
    return value;
  }

  @Get()
  listForCurrentUser(@Req() req: AuthenticatedRequest) {
    const userId = this.getUserIdFromRequest(req);
    return this.vouchersService.listForUser(userId);
  }

  @Get(":id")
  getOne(@Req() req: AuthenticatedRequest, @Param("id") id: string) {
    const userId = this.getUserIdFromRequest(req);
    const voucherId = Number(id);
    if (!Number.isInteger(voucherId) || voucherId <= 0) {
      throw new Error("ID do voucher inválido");
    }
    return this.vouchersService.findForUser(userId, voucherId);
  }

  @Post(":id/use")
  use(@Req() req: AuthenticatedRequest, @Param("id") id: string) {
    const userId = this.getUserIdFromRequest(req);
    const voucherId = Number(id);
    if (!Number.isInteger(voucherId) || voucherId <= 0) {
      throw new Error("ID do voucher inválido");
    }
    return this.vouchersService.useVoucher(userId, voucherId);
  }
}

