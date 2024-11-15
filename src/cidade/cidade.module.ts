import { Module } from "@nestjs/common";
import { CidadeService } from "./cidade.service";
import { CidadeController } from "./cidade.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  controllers: [CidadeController],
  providers: [CidadeService],
  imports: [PrismaModule],
})
export class CidadeModule {}
