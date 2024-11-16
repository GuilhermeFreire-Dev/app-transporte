import React from "react";

export default function Card(
  {
    children,
    onClick
  }: {
    children: React.ReactNode,
    onClick: Function
  }
) {
  return (
    <div className={"bg-neutral-700 py-3 px-5 rounded-lg"} onClick={onClick()}>
      {children}
    </div>
  )
}