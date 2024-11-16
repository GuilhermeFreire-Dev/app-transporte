import { Injectable } from "@nestjs/common";
import { CreateEstadoDto } from "./dto/create-estado.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Estado } from "@prisma/client";
import { UpdateEstadoDto } from "./dto/update-estado.dto";

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

  update(uf: string, updateEstadoDto: UpdateEstadoDto): Promise<Estado> {
    return this.prisma.estado.update({
      data: updateEstadoDto,
      where: { uf: uf },
    });
  }

  remove(uf: string): Promise<Estado> {
    return this.prisma.estado.delete({ where: { uf: uf } });
  }
}
