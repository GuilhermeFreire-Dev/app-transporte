import { IFuncionario } from "../interface/funcionario.interface";
import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateFuncionarioDto implements IFuncionario {
  @IsNotEmpty()
  @MaxLength(100)
  nome: string;
}
