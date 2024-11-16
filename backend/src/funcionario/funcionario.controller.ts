import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  HttpException,
  HttpStatus,
  Delete,
} from "@nestjs/common";
import { FuncionarioService } from "./funcionario.service";
import { CreateFuncionarioDto } from "./dto/create-funcionario.dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PrismaErrors } from "../prisma/enum/prisma-error.enum";
import { UpdateFuncionarioDto } from "./dto/update-funcionario.dto";

@Controller("funcionario")
export class FuncionarioController {
  constructor(private readonly funcionarioService: FuncionarioService) {}

  @Post()
  create(@Body() createFuncionarioDto: CreateFuncionarioDto) {
    return this.funcionarioService.create(createFuncionarioDto);
  }

  @Get()
  findAll() {
    return this.funcionarioService.findAll();
  }

  @Get(":num_registro")
  findOne(@Param("num_registro") num_registro: number) {
    return this.funcionarioService.findOne(num_registro);
  }

  @Patch(":num_registro")
  async update(
    @Param("num_registro") num_registro: string,
    @Body() updateFuncionarioDto: UpdateFuncionarioDto,
  ) {
    try {
      return await this.funcionarioService.update(
        +num_registro,
        updateFuncionarioDto,
      );
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code == PrismaErrors.RECORD_NOT_FOUND) {
          throw new HttpException(
            "Não foi possível alterar. Funcionario não encontrado",
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

  @Delete(":num_registro")
  async remove(@Param("num_registro") num_registro: string) {
    try {
      return await this.funcionarioService.remove(+num_registro);
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code == PrismaErrors.RECORD_NOT_FOUND) {
          throw new HttpException(
            "Não foi possível excluir. Funcionario não encontrado",
            HttpStatus.NOT_FOUND,
          );
        }
        if (err.code == PrismaErrors.FK_VIOLATION) {
          throw new HttpException(
            "Não foi possível excluir. Registro filho encontrado",
            HttpStatus.BAD_REQUEST,
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
