import { ICliente } from "./cliente.interface";

export interface IPessoaFisica extends ICliente {
  nome: string;
  cpf: string;
}
