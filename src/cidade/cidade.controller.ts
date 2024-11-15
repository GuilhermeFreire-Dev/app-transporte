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
import { CidadeService } from "./cidade.service";
import { CreateCidadeDto } from "./dto/create-cidade.dto";
import { UpdateCidadeDto } from "./dto/update-cidade.dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PrismaErrors } from "../prisma/enum/prisma-error.enum";

@Controller("cidade")
export class CidadeController {
  constructor(private readonly cidadeService: CidadeService) {}

  @Post()
  create(@Body() createCidadeDto: CreateCidadeDto) {
    return this.cidadeService.create(createCidadeDto);
  }

  @Get()
  findAll() {
    return this.cidadeService.findAll();
  }

  @Get(":codigo")
  findOne(@Param("codigo") codigo: number) {
    const cidade = this.cidadeService.findOne(+codigo);
    if (!cidade) {
      throw new HttpException("Cidade não encontrada", HttpStatus.NOT_FOUND);
    }
    return cidade;
  }

  @Patch(":codigo")
  async update(
    @Param("codigo") codigo: string,
    @Body() updateCidadeDto: UpdateCidadeDto,
  ) {
    try {
      return await this.cidadeService.update(+codigo, updateCidadeDto);
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code == PrismaErrors.RECORD_NOT_FOUND) {
          throw new HttpException(
            "Não foi possível alterar o registro. Cidade não encontrada",
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

  @Delete(":codigo")
  async remove(@Param("codigo") codigo: string) {
    try {
      return await this.cidadeService.remove(+codigo);
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code == PrismaErrors.RECORD_NOT_FOUND) {
          throw new HttpException(
            "Não foi possível excluir o registro. Cidade não encontrada",
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
