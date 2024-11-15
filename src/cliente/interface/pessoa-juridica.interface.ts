import { ICliente } from "./cliente.interface";

export interface IPessoaJuridica extends ICliente {
  razao_social: string;
  cnpj: string;
  inscricao_estadual: string;
}
