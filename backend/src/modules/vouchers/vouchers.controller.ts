import { Controller, Get, Param, Post, UseGuards, BadRequestException } from "@nestjs/common";
import { VouchersService } from "./vouchers.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CurrentUser, CurrentUserData } from "../auth/current-user.decorator";

@Controller("vouchers")
@UseGuards(JwtAuthGuard)
export class VouchersController {
  constructor(private readonly vouchersService: VouchersService) {}

  @Get()
  async listForCurrentUser(@CurrentUser() user: CurrentUserData) {
    const vouchers = await this.vouchersService.listForUser(user.id);

    // Formatar resposta para manter compatibilidade com frontend
    return vouchers.map((voucher) => ({
      id: voucher.id,
      code: voucher.code,
      status: voucher.status,
      used: voucher.status === "used",
      usedAt: voucher.used_at,
      createdAt: voucher.created_at,
      expiresAt: voucher.expires_at,
      restaurantName: voucher.restaurant.name,
      city: voucher.restaurant.city,
      discountLabel: voucher.restaurant.discount_label,
      imageUrl: voucher.restaurant.image_url,
      category: voucher.restaurant.category,
      restaurant: {
        id: voucher.restaurant.id,
        name: voucher.restaurant.name,
        city: voucher.restaurant.city,
        discountLabel: voucher.restaurant.discount_label,
        imageUrl: voucher.restaurant.image_url,
        category: voucher.restaurant.category,
      },
    }));
  }

  @Get(":id")
  async getOne(@CurrentUser() user: CurrentUserData, @Param("id") id: string) {
    // Validar UUID
    if (!id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
      throw new BadRequestException("ID do voucher inválido");
    }

    const voucher = await this.vouchersService.findForUser(user.id, id);

    return {
      id: voucher.id,
      code: voucher.code,
      status: voucher.status,
      used: voucher.status === "used",
      usedAt: voucher.used_at,
      createdAt: voucher.created_at,
      expiresAt: voucher.expires_at,
      restaurantName: voucher.restaurant.name,
      city: voucher.restaurant.city,
      discountLabel: voucher.restaurant.discount_label,
      imageUrl: voucher.restaurant.image_url,
      category: voucher.restaurant.category,
      restaurant: {
        id: voucher.restaurant.id,
        name: voucher.restaurant.name,
        city: voucher.restaurant.city,
        discountLabel: voucher.restaurant.discount_label,
        imageUrl: voucher.restaurant.image_url,
        category: voucher.restaurant.category,
      },
    };
  }

  @Post(":id/use")
  async use(@CurrentUser() user: CurrentUserData, @Param("id") id: string) {
    // Validar UUID
    if (!id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
      throw new BadRequestException("ID do voucher inválido");
    }

    const voucher = await this.vouchersService.useVoucher(user.id, id);

    return {
      id: voucher.id,
      code: voucher.code,
      status: voucher.status,
      used: voucher.status === "used",
      usedAt: voucher.used_at,
      restaurantName: voucher.restaurant.name,
      city: voucher.restaurant.city,
      discountLabel: voucher.restaurant.discount_label,
    };
  }
}
