"use client"
import React, { useEffect, useState } from "react";
import AlertBox, { Alert, AlertType } from "@/app/components/alert-box";
import Container from "@/app/components/container";
import Card from "@/app/components/card";
import Modal from "@/app/components/modal";
import Form from "@/app/components/form";
import Fieldset from "@/app/components/fieldset";
import { Estado } from "@/app/estado/page";

type Cidade = {
  codigo?: number;
  nome?: string;
  uf_cidade?: string;
  created_at?: string;
  updated_at?: string;
}

export default function Cidade() {

  const [showModal, setShowModal] = useState<boolean>(false);
  const [cidades, setCidades] = useState<Cidade[]>(Array<Cidade>);
  const [estados, setEstados] = useState<Estado[]>(Array<Estado>);
  const [cidade, setCidade] = useState<Cidade>();
  const [alert, setAlert] = useState<Alert>({
    message: "",
    alert_type: AlertType.SUCCESS,
    emitted_at: new Date(),
  });

  useEffect(() => {
    getAll();
    getAllEstados();
  },[]);

  function getAll(): void {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cidade`)
      .then(async res => {
        if (res.ok) {
          setCidades(await res.json());
        }
      }).catch(e => {
      console.error(e);
    });
  }

  function getAllEstados() {
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
    if (cidade?.created_at) {
      update();
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cidade`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cidade)
    }).then(async res => {
      if (res.ok) {
        setAlert({
          message: "Cidade criada com sucesso",
          alert_type: AlertType.SUCCESS,
          emitted_at: new Date()
        });
        cidades.push(await res.json());
        setCidades(cidades);
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
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cidade/${cidade?.codigo}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cidade)
    }).then(async res => {
      if (res.ok) {
        setAlert({
          message: "Cidade atualizada com sucesso",
          alert_type: AlertType.SUCCESS,
          emitted_at: new Date()
        });
        let est = await res.json();
        let index = cidades.findIndex(
          cidade => cidade.codigo === est.codigo
        );
        cidades[index] = est;
        setCidades(cidades);
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

  function remove(cidade: Cidade) {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cidade/${cidade?.codigo}`, {
      method: "DELETE",
    }).then(async res => {
      if (res.ok) {
        setAlert({
          message: "Cidade removida com sucesso",
          alert_type: AlertType.SUCCESS,
          emitted_at: new Date()
        });
        let est = await res.json();
        setCidades(cidades.filter(cidade => (cidade.codigo !== est.codigo)));
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
    setCidade((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target;
    setCidade((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function openModal(cidade: Cidade) {
    setCidade(cidade);
    setShowModal(true);
  }

  return (
    <>
      <Container header={"Cidade"} onNew={()=>{openModal({})}}>
        {
          cidades.map((cidade) => (
            <Card key={cidade.codigo}>
              <div className={"flex flex-row justify-between"}>
                <div className={"w-full"} onClick={()=>{openModal(cidade)}}>
                  <p>{cidade.codigo}</p>
                  <p>{`${cidade.nome} - ${cidade.uf_cidade}`}</p>
                </div>
                <button className={"text-red-400"} onClick={()=>{remove(cidade)}}>excluir</button>
              </div>
            </Card>
          ))
        }
      </Container>
      {
        showModal && (
          <Modal header={"Criar/Editar Cidade"}
                 onCancel={()=>{setShowModal(false)}}
                 onOk={()=>{create()}}>
            <Form>
              <Fieldset>
                <label>Nome</label>
                <input name={"nome"} type="text" defaultValue={cidade?.nome} onInput={handleInput} required></input>
              </Fieldset>
              <Fieldset>
                <label>Estado</label>
                <select name={"uf_cidade"} onInput={handleSelect} defaultValue={cidade?.uf_cidade}>
                  <option value={""}>selecione</option>
                  {
                    estados.map((estado) => (
                      <option value={estado.uf} key={estado.uf}>{`${estado.nome} - ${estado.uf}`}</option>
                    ))
                  }
                </select>
              </Fieldset>
            </Form>
          </Modal>
        )
      }
      <AlertBox alert={alert}></AlertBox>
    </>
  )
}