import { Pagador, TipoCobranca } from "@prisma/client";

export interface IFrete {
  valor_frete: number;
  icms: number;
  pedagio: number;
  peso: number;
  tipo_cobranca: TipoCobranca;
  data_frete: Date;
  pagador: Pagador;
  cod_cli_remetente: number;
  cod_cli_destinatario: number;
  cod_cidade_origem: number;
  cod_cidade_destino: number;
  num_reg_funcionario: number;
}
