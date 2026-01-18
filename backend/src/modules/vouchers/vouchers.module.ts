import { Module } from "@nestjs/common";
import { VouchersService } from "./vouchers.service";
import { VouchersController } from "./vouchers.controller";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [AuthModule],
  providers: [VouchersService],
  controllers: [VouchersController],
  exports: [VouchersService],
})
export class VouchersModule {}
