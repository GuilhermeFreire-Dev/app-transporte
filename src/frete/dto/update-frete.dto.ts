import { IFrete } from "../interface/frete.interface";
import { IsDateString, IsEnum, IsNotEmpty } from "class-validator";
import { Pagador, TipoCobranca } from "@prisma/client";

export class UpdateFreteDto implements IFrete {
  @IsNotEmpty()
  valor_frete: number;

  @IsNotEmpty()
  icms: number;

  @IsNotEmpty()
  pedagio: number;

  @IsNotEmpty()
  peso: number;

  @IsNotEmpty()
  @IsEnum(TipoCobranca)
  tipo_cobranca: TipoCobranca;

  @IsNotEmpty()
  @IsDateString({ strict: false })
  data_frete: Date;

  @IsNotEmpty()
  @IsEnum(Pagador)
  pagador: Pagador;

  @IsNotEmpty()
  cod_cli_remetente: number;

  @IsNotEmpty()
  cod_cli_destinatario: number;

  @IsNotEmpty()
  cod_cidade_origem: number;

  @IsNotEmpty()
  cod_cidade_destino: number;

  @IsNotEmpty()
  num_reg_funcionario: number;
}
