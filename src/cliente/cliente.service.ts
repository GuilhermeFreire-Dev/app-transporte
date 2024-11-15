import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Cliente, PessoaFisica, PessoaJuridica } from "@prisma/client";
import { CreatePessoaFisicaDto } from "./dto/create-pessoa-fisica.dto";
import { CreatePessoaJuridicaDto } from "./dto/create-pessoa-juridica";

@Injectable()
export class ClienteService {
  constructor(private prisma: PrismaService) {}

  createPessoaFisica(
    createPessoaFisicaDto: CreatePessoaFisicaDto,
  ): Promise<PessoaFisica> {
    return this.prisma.pessoaFisica.create({
      data: {
        cpf: createPessoaFisicaDto.cpf,
        nome: createPessoaFisicaDto.nome,
        cliente: {
          create: {
            data_insc: new Date(),
            endereco: createPessoaFisicaDto.endereco,
            telefone: createPessoaFisicaDto.telefone,
          },
        },
      },
    });
  }

  createPessoaJuridica(
    createPessoaJuridica: CreatePessoaJuridicaDto,
  ): Promise<PessoaJuridica> {
    return this.prisma.pessoaJuridica.create({
      data: {
        cnpj: createPessoaJuridica.cnpj,
        inscricao_estadual: createPessoaJuridica.inscricao_estadual,
        razao_social: createPessoaJuridica.razao_social,
        cliente: {
          create: {
            data_insc: new Date(),
            endereco: createPessoaJuridica.endereco,
            telefone: createPessoaJuridica.telefone,
          },
        },
      },
    });
  }

  findAll(): Promise<Cliente[]> {
    return this.prisma.cliente.findMany();
  }

  findOne(codigo: number): Promise<Cliente | null> {
    return this.prisma.cliente.findFirst({ where: { codigo: codigo } });
  }
}
