"use client"
import AlertBox, { Alert, AlertType } from "@/app/components/alert-box";
import Container from "@/app/components/container";
import Card from "@/app/components/card";
import Modal from "@/app/components/modal";
import Form from "@/app/components/form";
import Fieldset from "@/app/components/fieldset";
import React, { useEffect, useState } from "react";

export type Funcionario = {
  num_registro?: number;
  nome?: string;
  created_at?: string;
  updated_at?: string;
}

export default function Funcionario() {

  const [showModal, setShowModal] = useState<boolean>(false);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>(Array<Funcionario>);
  const [funcionario, setFuncionario] = useState<Funcionario>();
  const [alert, setAlert] = useState<Alert>({
    message: "",
    alert_type: AlertType.SUCCESS,
    emitted_at: new Date(),
  });

  useEffect(() => {
    getAll();
  },[]);

  function getAll(): void {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/funcionario`)
      .then(async res => {
        if (res.ok) {
          setFuncionarios(await res.json());
        }
      }).catch(e => {
      console.error(e);
    });
  }

  function create(): void {
    if (funcionario?.created_at) {
      update();
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/funcionario`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(funcionario)
    }).then(async res => {
      if (res.ok) {
        setAlert({
          message: "Funcionário criado com sucesso",
          alert_type: AlertType.SUCCESS,
          emitted_at: new Date()
        });
        funcionarios.push(await res.json());
        setFuncionarios(funcionarios);
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
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/funcionario/${funcionario?.num_registro}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(funcionario)
    }).then(async res => {
      if (res.ok) {
        setAlert({
          message: "Funcionário atualizado com sucesso",
          alert_type: AlertType.SUCCESS,
          emitted_at: new Date()
        });
        let est = await res.json();
        let index = funcionarios.findIndex(
          funcionario => funcionario.num_registro === est.num_registro
        );
        funcionarios[index] = est;
        setFuncionarios(funcionarios);
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

  function remove(funcionario: Funcionario) {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/funcionario/${funcionario?.num_registro}`, {
      method: "DELETE",
    }).then(async res => {
      if (res.ok) {
        setAlert({
          message: "Funcionário removido com sucesso",
          alert_type: AlertType.SUCCESS,
          emitted_at: new Date()
        });
        let est = await res.json();
        setFuncionarios(funcionarios.filter(funcionario => (funcionario.num_registro !== est.num_registro)));
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
    setFuncionario((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function openModal(funcionario: Funcionario) {
    setFuncionario(funcionario);
    setShowModal(true);
  }

  return (
    <>
      <Container header={"Funcionário"} onNew={()=>{openModal({})}}>
        {
          funcionarios.map((funcionario) => (
            <Card key={funcionario.num_registro}>
              <div className={"flex flex-row justify-between"}>
                <div className={"w-full"} onClick={()=>{openModal(funcionario)}}>
                  <p>{funcionario.num_registro}</p>
                  <p>{funcionario.nome}</p>
                </div>
                <button className={"text-red-400"} onClick={()=>{remove(funcionario)}}>excluir</button>
              </div>
            </Card>
          ))
        }
      </Container>
      {
        showModal && (
          <Modal header={"Criar/Editar Funcionário"}
                 onCancel={()=>{setShowModal(false)}}
                 onOk={()=>{create()}}>
            <Form>
              <Fieldset>
                <label>Nome</label>
                <input name={"nome"} type="text" defaultValue={funcionario?.nome} onInput={handleInput} required></input>
              </Fieldset>
            </Form>
          </Modal>
        )
      }
      <AlertBox alert={alert}></AlertBox>
    </>
  )
}