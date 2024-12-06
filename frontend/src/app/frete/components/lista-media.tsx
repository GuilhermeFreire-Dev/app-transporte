
import { Medias } from "@/app/frete/page";
import Card from "@/app/components/card";
import { useEffect } from "react";

export default function ListaMedias({medias}: {medias: Array<Medias>}) {
  return (
   <>
     {
       medias.map(media => {
         return (
           <Card key={media.cidade.codigo}>
             <h4>{media.cidade.nome}</h4>
             <p>{`Média de fretes de origem: R$ ${media.calculo.valor_frete.toFixed(2)}`}</p>
             <p>{`Média de fretes de destino: R$ ${media.calculo.valor_frete.toFixed(2)}`}</p>
           </Card>
         )
       })
     }
   </>
 )
}
