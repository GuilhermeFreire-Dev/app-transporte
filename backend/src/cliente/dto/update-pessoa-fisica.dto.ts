import { IsNotEmpty, MaxLength } from "class-validator";
import { IPessoaFisica } from "../interface/pessoa-fisica.interface";
import { CreateClienteDto } from "./create-cliente.dto";

export class UpdatePessoaFisicaDto
  extends CreateClienteDto
  implements Omit<IPessoaFisica, "cpf">
{
  @IsNotEmpty()
  @MaxLength(100)
  nome: string;
}
