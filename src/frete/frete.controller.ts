import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { FreteService } from "./frete.service";
import { CreateFreteDto } from "./dto/create-frete.dto";

@Controller("frete")
export class FreteController {
  constructor(private readonly freteService: FreteService) {}

  @Post()
  create(@Body() createFreteDto: CreateFreteDto) {
    return this.freteService.create(createFreteDto);
  }

  @Get()
  findAll() {
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

  // @Patch(":id")
  // update(@Param("id") id: string, @Body() updateFreteDto: UpdateFreteDto) {
  //   return this.freteService.update(+id, updateFreteDto);
  // }

  @Delete(":num_conhecimento")
  remove(@Param("num_conhecimento") num_conhecimento: number) {
    return this.freteService.remove(num_conhecimento);
  }
}
