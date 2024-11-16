import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
  Patch,
  Delete,
} from "@nestjs/common";
import { EstadoService } from "./estado.service";
import { CreateEstadoDto } from "./dto/create-estado.dto";
import { UpdateEstadoDto } from "./dto/update-estado.dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PrismaErrors } from "../prisma/enum/prisma-error.enum";

@Controller("estado")
export class EstadoController {
  constructor(private readonly estadoService: EstadoService) {}

  @Post()
  async create(@Body() createEstadoDto: CreateEstadoDto) {
    try {
      return await this.estadoService.create(createEstadoDto);
    } catch (err) {
      console.log(err);
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code == PrismaErrors.UK_VIOLATION) {
          throw new HttpException(
            "Não foi possível criar. UF já cadastrada",
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
    return this.estadoService.findAll();
  }

  @Get(":id")
  findOne(@Param("uf") uf: string) {
    const estado = this.estadoService.findOne(uf);
    if (!estado) {
      throw new HttpException("Estado não encontrado", HttpStatus.NOT_FOUND);
    }
    return estado;
  }

  @Patch(":uf")
  async update(
    @Param("uf") uf: string,
    @Body() updateEstadoDto: UpdateEstadoDto,
  ) {
    try {
      return await this.estadoService.update(uf, updateEstadoDto);
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code == PrismaErrors.RECORD_NOT_FOUND) {
          throw new HttpException(
            "Não foi possível alterar. Estado não encontrado",
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

  @Delete(":uf")
  async remove(@Param("uf") uf: string) {
    try {
      return await this.estadoService.remove(uf);
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code == PrismaErrors.RECORD_NOT_FOUND) {
          throw new HttpException(
            "Não foi possível excluir. Estado não encontrado",
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
