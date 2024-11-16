"use client"
import Form from "@/app/components/form";
import Modal from "@/app/components/modal";
import Fieldset from "@/app/components/fieldset";
import { useEffect, useState } from "react";
import Container from "@/app/components/container";
import Card from "@/app/components/card";

type Estado = {
  uf: string;
  nome: string;
  icms_local: number;
  icms_outro_uf: number;
  created_at: string;
  updated_at: string;
}

export default function Estado() {

  const [showModal, setShowModal] = useState(false);
  const [estados, setEstados] = useState(Array<Estado>);

  useEffect(() => {
    getAll();
  },[]);

  async function getAll() {
    const estados = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/estado`)
    .then(async res => {
      setEstados(await res.json());
    }).catch(e => {
      console.error(e);
    });
  }

  function create() {

  }

  function update() {

  }

  function remove() {

  }

  return (
    <>
      <Container header={"Estado"} onNew={()=>{setShowModal(true)}}>
        {
          estados.map((estado) => (
            <Card key={estado.uf} onClick={()=>{}}>
              <div>
                <p>{estado.uf}</p>
                <p>{estado.nome}</p>
              </div>
            </Card>
          ))
        }
      </Container>
      {
        showModal && (
          <Modal header={"Criar/Editar Estado"} onCancel={()=>{setShowModal(false)}} onOk={()=>{}}>
            <Form>
              <Fieldset>
                <label>UF</label>
                <input name={"uf"} type="text"></input>
              </Fieldset>
            </Form>
          </Modal>
        )
      }
    </>
  )
}