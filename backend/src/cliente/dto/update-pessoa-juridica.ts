import { IPessoaJuridica } from "../interface/pessoa-juridica.interface";
import { IsNotEmpty, MaxLength } from "class-validator";
import { CreateClienteDto } from "./create-cliente.dto";

export class UpdatePessoaJuridica
  extends CreateClienteDto
  implements Omit<IPessoaJuridica, "cnpj">
{
  @IsNotEmpty()
  @MaxLength(150)
  razao_social: string;

  @IsNotEmpty()
  @MaxLength(20)
  inscricao_estadual: string;
}
