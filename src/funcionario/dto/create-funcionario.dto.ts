import { IFuncionario } from "../interface/funcionario.interface";
import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateFuncionarioDto implements Pick<IFuncionario, "nome"> {
  @IsNotEmpty()
  @MaxLength(100)
  nome: string;
}
