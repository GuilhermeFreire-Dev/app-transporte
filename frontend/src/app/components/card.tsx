import React from "react";

export default function Card(
  {
    children,
    onClick
  }: {
    children: React.ReactNode,
    onClick?: Function
  }
) {
  return (
    <div className={"bg-neutral-700 py-3 px-5 my-2 rounded-lg cursor-pointer hover:bg-neutral-600"}
         onClick={()=>{onClick ? onClick() : null}}>
      {children}
    </div>
  )
}