import { IsNotEmpty, Length, MaxLength } from "class-validator";
import { IPessoaFisica } from "../interface/pessoa-fisica.interface";
import { CreateClienteDto } from "./create-cliente.dto";

export class CreatePessoaFisicaDto
  extends CreateClienteDto
  implements IPessoaFisica
{
  @IsNotEmpty()
  @MaxLength(100)
  nome: string;

  @IsNotEmpty()
  @Length(11)
  cpf: string;
}
