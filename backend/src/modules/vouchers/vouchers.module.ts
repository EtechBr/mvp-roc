import { Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { VouchersService } from "./vouchers.service";
import { VouchersController } from "./vouchers.controller";

@Module({
  imports: [UsersModule],
  providers: [VouchersService],
  controllers: [VouchersController],
  exports: [VouchersService]
})
export class VouchersModule {}


