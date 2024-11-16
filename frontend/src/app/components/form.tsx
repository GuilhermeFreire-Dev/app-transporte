import React from "react";

export default function Form({children}: {children: React.ReactNode}) {
  return (
    <form className={"text-neutral-950"}>
      {children}
    </form>
  )
}