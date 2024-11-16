import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ClienteService } from "./cliente.service";
import { CreatePessoaFisicaDto } from "./dto/create-pessoa-fisica.dto";
import { CreatePessoaJuridicaDto } from "./dto/create-pessoa-juridica";

@Controller("cliente")
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post("/pessoa-fisica")
  createPessoaFisica(@Body() createClienteDto: CreatePessoaFisicaDto) {
    return this.clienteService.createPessoaFisica(createClienteDto);
  }

  @Post("/pessoa-juridica")
  createPessoaJuridica(@Body() createClienteDto: CreatePessoaJuridicaDto) {
    return this.clienteService.createPessoaJuridica(createClienteDto);
  }

  @Get()
  findAll() {
    return this.clienteService.findAll();
  }

  @Get(":codigo")
  findOne(@Param("codigo") codigo: number) {
    return this.clienteService.findOne(codigo);
  }
}
