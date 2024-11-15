import { Module } from "@nestjs/common";
import { FuncionarioService } from "./funcionario.service";
import { FuncionarioController } from "./funcionario.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  controllers: [FuncionarioController],
  providers: [FuncionarioService],
  imports: [PrismaModule],
})
export class FuncionarioModule {}
