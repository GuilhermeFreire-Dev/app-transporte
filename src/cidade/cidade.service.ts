import { Injectable } from "@nestjs/common";
import { CreateCidadeDto } from "./dto/create-cidade.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Cidade } from "@prisma/client";
import { UpdateCidadeDto } from "./dto/update-cidade.dto";

@Injectable()
export class CidadeService {
  constructor(private prisma: PrismaService) {}

  create(createCidadeDto: CreateCidadeDto): Promise<Cidade> {
    return this.prisma.cidade.create({ data: createCidadeDto });
  }

  findAll(): Promise<Cidade[]> {
    return this.prisma.cidade.findMany();
  }

  findOne(codigo: number): Promise<Cidade | null> {
    return this.prisma.cidade.findFirst({ where: { codigo: codigo } });
  }

  update(codigo: number, updateCidadeDto: UpdateCidadeDto): Promise<Cidade> {
    return this.prisma.cidade.update({
      data: updateCidadeDto,
      where: { codigo: codigo },
    });
  }

  remove(codigo: number): Promise<Cidade> {
    return this.prisma.cidade.delete({ where: { codigo: codigo } });
  }
}
