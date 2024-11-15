export interface IEstado {
  uf: string;
  nome: string;
  icms_local: number;
  icms_outro_uf: number;
  created_at?: Date;
  updated_at?: Date;
}
