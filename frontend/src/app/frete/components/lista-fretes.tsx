import Card from "@/app/components/card";
import React from "react";
import { Frete } from "@/app/frete/page";

export default function ListaFretes({ fretes }: { fretes: Array<Frete> }) {
  return (
    <>
      {fretes.map((frete) => (
        <Card key={frete.num_conhecimento}>
          <div className={""}>
            <p>Número do Conhecimento: {frete.num_conhecimento}</p>
            <p>{`Valor do frete: ${frete.valor_frete}`}</p>
            <p>{`Remetente: ${frete.remetente?.empresa?.razao_social}`}</p>
            <p>{`Destinatario: ${frete.destinatario?.empresa?.razao_social}`}</p>
          </div>
        </Card>
      ))}
    </>
  );
}