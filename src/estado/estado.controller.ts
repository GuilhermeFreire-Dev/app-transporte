import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { EstadoService } from "./estado.service";
import { CreateEstadoDto } from "./dto/create-estado.dto";

@Controller("estado")
export class EstadoController {
  constructor(private readonly estadoService: EstadoService) {}

  @Post()
  create(@Body() createEstadoDto: CreateEstadoDto) {
    return this.estadoService.create(createEstadoDto);
  }

  @Get()
  findAll() {
    return this.estadoService.findAll();
  }

  @Get(":id")
  async findOne(@Param("uf") uf: string) {
    const estado = this.estadoService.findOne(uf);
    if (!estado) {
      throw new HttpException("Estado não encontrado", HttpStatus.NOT_FOUND);
    }
    return estado;
  }
}
