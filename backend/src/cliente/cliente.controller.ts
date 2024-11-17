import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ClienteService } from "./cliente.service";
import { CreatePessoaFisicaDto } from "./dto/create-pessoa-fisica.dto";
import { CreatePessoaJuridicaDto } from "./dto/create-pessoa-juridica";
import { UpdatePessoaFisicaDto } from "./dto/update-pessoa-fisica.dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PrismaErrors } from "../prisma/enum/prisma-error.enum";
import { UpdatePessoaJuridica } from "./dto/update-pessoa-juridica";

@Controller("cliente")
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post("/pessoa-fisica")
  async createPessoaFisica(@Body() createClienteDto: CreatePessoaFisicaDto) {
    try {
      return await this.clienteService.createPessoaFisica(createClienteDto);
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code == PrismaErrors.UK_VIOLATION) {
          throw new HttpException(
            "Não foi possível criar. Cliente já cadastrado",
            HttpStatus.NOT_FOUND,
          );
        }
      }
      throw new HttpException(
        "Erro desconhecido",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post("/pessoa-juridica")
  async createPessoaJuridica(
    @Body() createClienteDto: CreatePessoaJuridicaDto,
  ) {
    try {
      return await this.clienteService.createPessoaJuridica(createClienteDto);
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code == PrismaErrors.UK_VIOLATION) {
          throw new HttpException(
            "Não foi possível criar. Cliente já cadastrado",
            HttpStatus.NOT_FOUND,
          );
        }
      }
      throw new HttpException(
        "Erro desconhecido",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  findAll() {
    return this.clienteService.findAll();
  }

  @Get(":codigo")
  findOne(@Param("codigo") codigo: number) {
    return this.clienteService.findOne(codigo);
  }

  @Patch("/pessoa-fisica/:codigo")
  async updatePessoaFisica(
    @Param("codigo") codigo: string,
    @Body() updatePessoaFisicaDto: UpdatePessoaFisicaDto,
  ) {
    try {
      return await this.clienteService.updatePessoaFisica(
        +codigo,
        updatePessoaFisicaDto,
      );
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code == PrismaErrors.RECORD_NOT_FOUND) {
          throw new HttpException(
            "Não foi possível alterar. Cliente não encontrado",
            HttpStatus.NOT_FOUND,
          );
        }
      }
      console.log(err);
      throw new HttpException(
        "Erro desconhecido",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch("/pessoa-juridica/:codigo")
  async updatePessoaJuridica(
    @Param("codigo") codigo: string,
    @Body() updatePessoaJuridicaDto: UpdatePessoaJuridica,
  ) {
    try {
      return await this.clienteService.updatePessoaJuridica(
        +codigo,
        updatePessoaJuridicaDto,
      );
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code == PrismaErrors.RECORD_NOT_FOUND) {
          throw new HttpException(
            "Não foi possível alterar. Cliente não encontrado",
            HttpStatus.NOT_FOUND,
          );
        }
      }
      throw new HttpException(
        "Erro desconhecido",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete("/pessoa-fisica/:codigo")
  async removePessoaFisica(@Param("codigo") codigo: string) {
    try {
      const pessoa_fisica =
        await this.clienteService.removePessoaFisica(+codigo);
      await this.clienteService.remove(+codigo);
      return pessoa_fisica;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code == PrismaErrors.RECORD_NOT_FOUND) {
          throw new HttpException(
            "Não foi possível remover. Cliente não encontrado",
            HttpStatus.NOT_FOUND,
          );
        }
        if (err.code == PrismaErrors.FK_VIOLATION) {
          throw new HttpException(
            "Não foi possível remover. Cliente registro filho encontrado",
            HttpStatus.NOT_FOUND,
          );
        }
      }
      throw new HttpException(
        "Erro desconhecido",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete("/pessoa-juridica/:codigo")
  async removePessoaJuridica(@Param("codigo") codigo: string) {
    try {
      const pessoa_juridica =
        await this.clienteService.removePessoaJuridica(+codigo);
      await this.clienteService.remove(+codigo);
      return pessoa_juridica;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code == PrismaErrors.RECORD_NOT_FOUND) {
          throw new HttpException(
            "Não foi possível remover. Cliente não encontrado",
            HttpStatus.NOT_FOUND,
          );
        }
        if (err.code == PrismaErrors.FK_VIOLATION) {
          throw new HttpException(
            "Não foi possível remover. Cliente registro filho encontrado",
            HttpStatus.NOT_FOUND,
          );
        }
      }
      throw new HttpException(
        "Erro desconhecido",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
