import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Patch,
  Query,
} from "@nestjs/common";
import { FreteService } from "./frete.service";
import { CreateFreteDto } from "./dto/create-frete.dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PrismaErrors } from "../prisma/enum/prisma-error.enum";
import { UpdateFreteDto } from "./dto/update-frete.dto";

@Controller("frete")
export class FreteController {
  constructor(private readonly freteService: FreteService) {}

  @Post()
  create(@Body() createFreteDto: CreateFreteDto) {
    return this.freteService.create(createFreteDto);
  }

  @Get()
  findAll(
    @Query("uf") uf: string,
    @Query("total") total: boolean,
    @Query("pj") pj: boolean,
    @Query("data") data: string,
  ) {
    if (total) {
      return this.freteService.totalByCidade(uf);
    }
    if (pj) {
      return this.freteService.findAllFromPessoaJuridica(data);
    }
    return this.freteService.findAll();
  }

  @Get(":num_conhecimento")
  findOne(@Param("num_conhecimento") num_conhecimento: number) {
    const frete = this.freteService.findOne(num_conhecimento);
    if (!frete) {
      throw new HttpException("Frete não encontrado", HttpStatus.NOT_FOUND);
    }
    return frete;
  }

  @Patch(":num_conhecimento")
  async update(
    @Param("num_conhecimento") num_conhecimento: string,
    @Body() updateFreteDto: UpdateFreteDto,
  ) {
    try {
      return await this.freteService.update(+num_conhecimento, updateFreteDto);
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code == PrismaErrors.RECORD_NOT_FOUND) {
          throw new HttpException(
            "Não foi possível excluir o registro. Frete não encontrado",
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

  @Delete(":num_conhecimento")
  async remove(@Param("num_conhecimento") num_conhecimento: string) {
    try {
      return await this.freteService.remove(+num_conhecimento);
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code == PrismaErrors.RECORD_NOT_FOUND) {
          throw new HttpException(
            "Não foi possível excluir o registro. Frete não encontrado",
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
