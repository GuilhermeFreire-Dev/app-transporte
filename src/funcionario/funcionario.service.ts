import { Injectable } from "@nestjs/common";
import { CreateFuncionarioDto } from "./dto/create-funcionario.dto";
import { Funcionario } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class FuncionarioService {
  constructor(private prisma: PrismaService) {}

  create(createFuncionarioDto: CreateFuncionarioDto): Promise<Funcionario> {
    return this.prisma.funcionario.create({ data: createFuncionarioDto });
  }

  findAll(): Promise<Funcionario[]> {
    return this.prisma.funcionario.findMany();
  }

  findOne(num_registro: number): Promise<Funcionario | null> {
    return this.prisma.funcionario.findFirst({
      where: { num_registro: num_registro },
    });
  }
}
