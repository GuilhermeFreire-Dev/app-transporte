import { Totais } from "@/app/frete/page";
import Card from "@/app/components/card";

export default function ListaTotais({totais}: {totais: Array<Totais>}) {
 return (
   <>
     {
       totais.map(total => {
         return (
           <Card key={total.cidade.codigo}>
             <h4>{total.cidade.nome}</h4>
             <p>{`Valor total de fretes: R$ ${total.totais.sum.valor_frete}`}</p>
             <p>{`Quantidade de fretes: ${total.totais.count._all}`}</p>
           </Card>
         )
       })
     }
   </>
 )
}