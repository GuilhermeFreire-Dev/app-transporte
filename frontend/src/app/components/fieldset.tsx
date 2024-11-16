import React from "react";

export default function Fieldset({children}: {children: React.ReactNode}) {
  return (
    <fieldset className={"flex flex-col m-2"}>
      {children}
    </fieldset>
  )
}