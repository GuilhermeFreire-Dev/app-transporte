import { ICidade } from "../interface/cidade.interface";
import { IsNotEmpty, Length, MaxLength } from "class-validator";

export class UpdateCidadeDto implements ICidade {
  @IsNotEmpty()
  @MaxLength(100)
  nome: string;

  @IsNotEmpty()
  @Length(2)
  uf_cidade: string;
}
