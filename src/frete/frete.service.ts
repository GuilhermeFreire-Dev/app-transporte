import { Injectable } from "@nestjs/common";
import { CreateFreteDto } from "./dto/create-frete.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Frete } from "@prisma/client";

@Injectable()
export class FreteService {
  constructor(private prisma: PrismaService) {}

  create(createFreteDto: CreateFreteDto): Promise<Frete> {
    return this.prisma.frete.create({
      data: {
        ...createFreteDto,
        data_frete: new Date(createFreteDto.data_frete),
      },
    });
  }

  findAll(): Promise<Frete[]> {
    return this.prisma.frete.findMany();
  }

  findOne(num_conhecimento: number): Promise<Frete | null> {
    return this.prisma.frete.findFirst({
      where: { num_conhecimento: num_conhecimento },
    });
  }

  remove(num_conhecimento: number): Promise<Frete> {
    return this.prisma.frete.delete({
      where: { num_conhecimento: num_conhecimento },
    });
  }
}
