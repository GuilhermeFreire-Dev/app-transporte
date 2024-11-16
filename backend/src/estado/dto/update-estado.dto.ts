import { IsNotEmpty, Length, MaxLength, Min } from "class-validator";
import { IEstado } from "../interface/estado.interface";

export class UpdateEstadoDto implements IEstado {
  @IsNotEmpty()
  @Length(2)
  uf: string;

  @IsNotEmpty()
  @MaxLength(100)
  nome: string;

  @IsNotEmpty()
  @Min(0)
  icms_local: number;

  @IsNotEmpty()
  @Min(0)
  icms_outro_uf: number;
}
