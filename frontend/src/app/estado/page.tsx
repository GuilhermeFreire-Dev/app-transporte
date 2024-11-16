"use client";
import Form from "@/app/components/form";
import Modal from "@/app/components/modal";
import Fieldset from "@/app/components/fieldset";
import React, { useEffect, useState } from "react";
import Container from "@/app/components/container";
import Card from "@/app/components/card";
import AlertBox, { Alert, AlertType } from "@/app/components/alert-box";

export type Estado = {
  uf?: string;
  nome?: string;
  icms_local?: number;
  icms_outro_uf?: number;
  created_at?: string;
  updated_at?: string;
}

export default function Estado() {

  const [showModal, setShowModal] = useState<boolean>(false);
  const [estados, setEstados] = useState<Estado[]>(Array<Estado>);
  const [estado, setEstado] = useState<Estado>();
  const [alert, setAlert] = useState<Alert>({
    message: "",
    alert_type: AlertType.SUCCESS,
    emitted_at: new Date(),
  });

  useEffect(() => {
    getAll();
  },[]);

  function getAll(): void {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/estado`)
    .then(async res => {
      if (res.ok) {
        setEstados(await res.json());
      }
    }).catch(e => {
      console.error(e);
    });
  }

  function create(): void {
    if (estado?.created_at) {
      update();
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/estado`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(estado)
    }).then(async res => {
      if (res.ok) {
        setAlert({
          message: "Estado criado com sucesso",
          alert_type: AlertType.SUCCESS,
          emitted_at: new Date()
        });
        estados.push(await res.json());
        setEstados(estados);
        setShowModal(false);
      } else {
        const json = await res.json();
        setAlert({
          message: typeof json.message === "string" ? json.message : json.message.toString(),
          alert_type: AlertType.ERROR,
          emitted_at: new Date()
        });
      }
    }).catch(e => {
      console.error(e);
    });
  }

  function update() {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/estado/${estado?.uf}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(estado)
    }).then(async res => {
      if (res.ok) {
        setAlert({
          message: "Estado atualizado com sucesso",
          alert_type: AlertType.SUCCESS,
          emitted_at: new Date()
        });
        let est = await res.json();
        let index = estados.findIndex(
          estado => estado.uf === est.uf
        );
        estados[index] = est;
        setEstados(estados);
        setShowModal(false);
      } else {
        const json = await res.json();
        setAlert({
          message: typeof json.message === "string" ? json.message : json.message.toString(),
          alert_type: AlertType.ERROR,
          emitted_at: new Date()
        });
      }
    }).catch(e => {
      console.error(e);
    });
  }

  function remove(estado: Estado) {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/estado/${estado?.uf}`, {
      method: "DELETE",
    }).then(async res => {
      if (res.ok) {
        setAlert({
          message: "Estado removido com sucesso",
          alert_type: AlertType.SUCCESS,
          emitted_at: new Date()
        });
        let est = await res.json();
        setEstados(estados.filter(estado => (estado.uf !== est.uf)));
      } else {
        const json = await res.json();
        setAlert({
          message: typeof json.message === "string" ? json.message : json.message.toString(),
          alert_type: AlertType.ERROR,
          emitted_at: new Date()
        });
      }
    }).catch(e => {
      console.error(e);
    });
  }

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    let v = ["icms_local", "icms_outro_uf"].includes(name) ? Number(value) : value;
    setEstado((prev) => ({
      ...prev,
      [name]: v,
    }));
  }

  function openModal(estado: Estado) {
    setEstado(estado);
    setShowModal(true);
  }

  return (
    <>
      <Container header={"Estado"} onNew={()=>{openModal({})}}>
        {
          estados.map((estado) => (
            <Card key={estado.uf}>
              <div className={"flex flex-row justify-between"}>
                <div className={"w-full"} onClick={()=>{openModal(estado)}}>
                  <p>{estado.uf}</p>
                  <p>{estado.nome}</p>
                </div>
                <button className={"text-red-400"} onClick={()=>{remove(estado)}}>excluir</button>
              </div>
            </Card>
          ))
        }
      </Container>
      {
        showModal && (
          <Modal header={"Criar/Editar Estado"}
                 onCancel={()=>{setShowModal(false)}}
                 onOk={()=>{create()}}>
            <Form>
              <Fieldset>
                <label>UF</label>
                <input name={"uf"} type="text" defaultValue={estado?.uf} onInput={handleInput} required></input>
              </Fieldset>
              <Fieldset>
                <label>Nome</label>
                <input name={"nome"} type="text" defaultValue={estado?.nome} onInput={handleInput} required></input>
              </Fieldset>
              <Fieldset>
                <label>ICMS local</label>
                <input name={"icms_local"} type="number" defaultValue={estado?.icms_local} onInput={handleInput} required></input>
              </Fieldset>
              <Fieldset>
                <label>ICMS outro estado</label>
                <input name={"icms_outro_uf"} type="number" defaultValue={estado?.icms_outro_uf} onInput={handleInput} required></input>
              </Fieldset>
            </Form>
          </Modal>
        )
      }
      <AlertBox alert={alert}></AlertBox>
    </>
  )
}