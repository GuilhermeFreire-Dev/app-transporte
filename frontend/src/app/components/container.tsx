import React from "react";

export default function Container(
  {
    children,
    header,
    onNew,
  }: {
    children: React.ReactNode,
    header?: string,
    onNew: Function,
  }
) {
  return (
    <div className={"w-full"}>
      <div className={"flex flex-row justify-between mb-8"}>
        <h1 className={"text-3xl font-bold"}>{header}</h1>
        <button className={"bg-blue-600 w-32 py-2 rounded-lg"} onClick={()=>{onNew()}}>NOVO</button>
      </div>
      <div className={"h-[80vh] pr-2 overflow-y-scroll"}>
        {children}
      </div>
    </div>
  )
}