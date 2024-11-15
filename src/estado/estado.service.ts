import { Injectable } from "@nestjs/common";
import { CreateEstadoDto } from "./dto/create-estado.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Estado } from "@prisma/client";

@Injectable()
export class EstadoService {
  constructor(private prisma: PrismaService) {}

  create(createEstadoDto: CreateEstadoDto): Promise<Estado> {
    return this.prisma.estado.create({ data: createEstadoDto });
  }

  findAll(): Promise<Estado[]> {
    return this.prisma.estado.findMany();
  }

  findOne(uf: string): Promise<Estado | null> {
    return this.prisma.estado.findFirst({ where: { uf: uf } });
  }
}
