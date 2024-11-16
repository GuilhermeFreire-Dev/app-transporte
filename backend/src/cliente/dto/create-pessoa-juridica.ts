import { IPessoaJuridica } from "../interface/pessoa-juridica.interface";
import { IsNotEmpty, Length, MaxLength } from "class-validator";
import { CreateClienteDto } from "./create-cliente.dto";

export class CreatePessoaJuridicaDto
  extends CreateClienteDto
  implements IPessoaJuridica
{
  @IsNotEmpty()
  @MaxLength(150)
  razao_social: string;

  @IsNotEmpty()
  @Length(14)
  cnpj: string;

  @IsNotEmpty()
  @MaxLength(20)
  inscricao_estadual: string;
}
