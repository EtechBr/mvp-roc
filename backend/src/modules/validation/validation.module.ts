import { Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { VouchersModule } from "../vouchers/vouchers.module";
import { ValidationService } from "./validation.service";
import { ValidationController } from "./validation.controller";

@Module({
  imports: [UsersModule, VouchersModule],
  providers: [ValidationService],
  controllers: [ValidationController]
})
export class ValidationModule {}


