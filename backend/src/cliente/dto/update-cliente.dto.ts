import { ICliente } from "../interface/cliente.interface";
import { IsNotEmpty, IsPhoneNumber, MaxLength } from "class-validator";

export class UpdadeClienteDto
  implements Omit<ICliente, "created_at" | "updated_at">
{
  @IsNotEmpty()
  @MaxLength(255)
  endereco: string;

  @IsNotEmpty()
  @IsPhoneNumber("BR")
  @MaxLength(20)
  telefone: string;
}
