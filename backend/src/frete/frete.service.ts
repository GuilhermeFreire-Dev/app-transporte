import { Injectable } from "@nestjs/common";
import { CreateFreteDto } from "./dto/create-frete.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Frete } from "@prisma/client";
import { UpdateFreteDto } from "./dto/update-frete.dto";

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

  update(
    num_conhecimento: number,
    updateFreteDto: UpdateFreteDto,
  ): Promise<Frete> {
    return this.prisma.frete.update({
      data: {
        ...updateFreteDto,
        data_frete: new Date(updateFreteDto.data_frete),
      },
      where: { num_conhecimento: num_conhecimento },
    });
  }

  remove(num_conhecimento: number): Promise<Frete> {
    return this.prisma.frete.delete({
      where: { num_conhecimento: num_conhecimento },
    });
  }

  async totalByCidade(uf: string) {
    const cidades = await this.prisma.cidade.findMany({
      where: {
        uf_cidade: uf,
      },
    });

    const fretes = await this.prisma.frete.groupBy({
      by: ["cod_cidade_destino"],
      _sum: {
        valor_frete: true,
      },
      _count: {
        _all: true,
      },
      where: {
        cod_cidade_destino: {
          in: cidades.map((cidade) => cidade.codigo),
        },
      },
    });

    return fretes.map((frete) => {
      const cidade = cidades.find((c) => c.codigo === frete.cod_cidade_destino);
      return {
        cidade: cidade,
        totais: {
          sum: frete._sum,
          count: frete._count,
        },
      };
    });
  }
}
