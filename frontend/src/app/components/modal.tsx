"use client"
import React from "react";

export default function Modal(
  {
    children,
    header,
    onCancel,
    onOk,
  }: {
    children: React.ReactNode,
    header?: string,
    onCancel: Function,
    onOk: Function,
  }
) {
  return (
    <div className={"fixed top-0 left-0 z-10 w-full h-full bg-neutral-950 bg-opacity-75"}>
      <div className={"w-2/3 h-[80vh] my-[10vh] relative mx-auto p-8 rounded-3xl bg-neutral-50"}>
        <h4 className={"text-lg font-bold text-neutral-950"}>{header}</h4>
        {children}
        <div className={"absolute bottom-5 right-5"}>
          <button className={"bg-red-200 text-red-700 w-32 py-2 rounded-lg"} onClick={()=>{onCancel()}}>CANCELAR</button>
          <button className={"bg-green-600 w-32 py-2 rounded-lg ml-2"} onClick={()=>{onOk()}}>OK</button>
        </div>
      </div>
    </div>
  );
}