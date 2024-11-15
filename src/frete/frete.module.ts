import { Module } from "@nestjs/common";
import { FreteService } from "./frete.service";
import { FreteController } from "./frete.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  controllers: [FreteController],
  providers: [FreteService],
  imports: [PrismaModule],
})
export class FreteModule {}
