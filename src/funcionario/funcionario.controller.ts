import {
  Controller,
  Get,
  Post,
  Body,
  Param,
} from "@nestjs/common";
import { FuncionarioService } from "./funcionario.service";
import { CreateFuncionarioDto } from "./dto/create-funcionario.dto";

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
}
