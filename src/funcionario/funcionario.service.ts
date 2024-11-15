import { Injectable } from "@nestjs/common";
import { CreateFuncionarioDto } from "./dto/create-funcionario.dto";
import { Funcionario } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { UpdateFuncionarioDto } from "./dto/update-funcionario.dto";

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

  update(
    num_registro: number,
    updateFuncionarioDto: UpdateFuncionarioDto,
  ): Promise<Funcionario> {
    return this.prisma.funcionario.update({
      data: updateFuncionarioDto,
      where: { num_registro: num_registro },
    });
  }

  remove(num_registro: number) {
    return this.prisma.funcionario.delete({
      where: { num_registro: num_registro },
    });
  }
}
