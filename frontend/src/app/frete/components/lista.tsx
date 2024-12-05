import Card from "@/app/components/card";
import React from "react";
import { Frete } from "@/app/frete/page";

export default function Lista({
  edit,
  remove,
  fretes
}: {
  edit: Function,
  remove: Function,
  fretes: Array<Frete>
}) {
  return (
    <>
      {fretes.map((frete) => (
        <Card key={frete.num_conhecimento}>
          <div className={"flex flex-row justify-between"}>
            <div className={"w-full"} onClick={() => edit(frete)}>
              <p>Número do Conhecimento: {frete.num_conhecimento}</p>
              <p>{`Valor do frete: ${frete.valor_frete}`}</p>
              <p>{`Peso: ${frete.peso}`}</p>
              <p>{`Tipo de Cobrança: ${frete.tipo_cobranca}`}</p>
              <p>{`Pagador: ${frete.pagador}`}</p>
            </div>
            <button className={"text-red-400"} onClick={() => remove(frete)}>
              Excluir
            </button>
          </div>
        </Card>
      ))}
    </>
  );
}