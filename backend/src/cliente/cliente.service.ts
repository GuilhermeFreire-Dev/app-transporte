import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Cliente, PessoaFisica, PessoaJuridica } from "@prisma/client";
import { CreatePessoaFisicaDto } from "./dto/create-pessoa-fisica.dto";
import { CreatePessoaJuridicaDto } from "./dto/create-pessoa-juridica";
import { UpdatePessoaFisicaDto } from "./dto/update-pessoa-fisica.dto";
import { UpdatePessoaJuridica } from "./dto/update-pessoa-juridica";

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
      include: { cliente: true },
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
      include: { cliente: true },
    });
  }

  findAll(): Promise<Cliente[]> {
    return this.prisma.cliente.findMany({
      include: { pessoa: true, empresa: true },
    });
  }

  findOne(codigo: number): Promise<Cliente | null> {
    return this.prisma.cliente.findFirst({ where: { codigo: codigo } });
  }

  updatePessoaFisica(
    codigo: number,
    updatePessoaFisicaDto: UpdatePessoaFisicaDto,
  ): Promise<PessoaFisica> {
    return this.prisma.pessoaFisica.update({
      data: {
        nome: updatePessoaFisicaDto.nome,
        cliente: {
          update: {
            data: {
              telefone: updatePessoaFisicaDto.telefone,
              endereco: updatePessoaFisicaDto.endereco,
            },
          },
        },
      },
      where: {
        cod_cliente: codigo,
      },
      include: {
        cliente: true,
      },
    });
  }

  updatePessoaJuridica(
    codigo: number,
    updatePessoaJuridica: UpdatePessoaJuridica,
  ): Promise<PessoaJuridica> {
    return this.prisma.pessoaJuridica.update({
      data: {
        razao_social: updatePessoaJuridica.razao_social,
        inscricao_estadual: updatePessoaJuridica.inscricao_estadual,
        cliente: {
          update: {
            data: {
              telefone: updatePessoaJuridica.telefone,
              endereco: updatePessoaJuridica.endereco,
            },
          },
        },
      },
      where: {
        cod_cliente: codigo,
      },
      include: {
        cliente: true,
      },
    });
  }

  removePessoaFisica(codigo: number): Promise<PessoaFisica> {
    return this.prisma.pessoaFisica.delete({
      where: { cod_cliente: codigo },
    });
  }

  removePessoaJuridica(codigo: number): Promise<PessoaJuridica> {
    return this.prisma.pessoaJuridica.delete({
      where: { cod_cliente: codigo },
    });
  }

  remove(codigo: number): Promise<Cliente> {
    return this.prisma.cliente.delete({ where: { codigo: codigo } });
  }
}
