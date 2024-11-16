import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { EstadoModule } from "./estado/estado.module";
import { CidadeModule } from "./cidade/cidade.module";
import { ClienteModule } from "./cliente/cliente.module";
import { FuncionarioModule } from "./funcionario/funcionario.module";
import { FreteModule } from "./frete/frete.module";

@Module({
  imports: [
    PrismaModule,
    EstadoModule,
    CidadeModule,
    ClienteModule,
    FuncionarioModule,
    FreteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
