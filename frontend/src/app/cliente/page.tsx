"use client"
import React, { useEffect, useState } from "react";
import AlertBox, { Alert, AlertType } from "@/app/components/alert-box";
import Container from "@/app/components/container";
import Card from "@/app/components/card";
import Modal from "@/app/components/modal";
import Form from "@/app/components/form";
import Fieldset from "@/app/components/fieldset";

type Cliente = {
  codigo?: number;
  data_insc?: string;
  endereco?: string;
  telefone?: string;
  pessoa?: Pessoa;
  empresa?: Empresa;
  created_at?: string;
  updated_at?: string;
}

type Pessoa = {
  codigo?: number;
  nome?: string;
  cpf?: string;
  cod_cliente?: number;
  created_at?: string;
  updated_at?: string;
}

type Empresa = {
  codigo?: number;
  razao_social?: string;
  cnpj?: string;
  inscricao_estadual?: string;
  cod_cliente?: number;
  created_at?: string;
  updated_at?: string;
}

enum TipoCliente {
  PESSOA = "pessoa",
  EMPRESA = "empresa",
}

export default function Cliente() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [clientes, setClientes] = useState<Cliente[]>(Array<Cliente>);
  const [cliente, setCliente] = useState<Cliente>();
  const [tipoCliente, setTipoCliente] = useState<string>("");
  const [alert, setAlert] = useState<Alert>({
    message: "",
    alert_type: AlertType.SUCCESS,
    emitted_at: new Date(),
  });

  useEffect(() => {
    getAll();
  },[]);

  function getPath(tipo: string) {
    return tipo === TipoCliente.EMPRESA ?
        "pessoa-juridica" : "pessoa-fisica";
  }

  function makePayload() {
    if (cliente?.empresa || tipoCliente === TipoCliente.EMPRESA) {
      return {
        endereco: cliente?.endereco,
        telefone: cliente?.telefone,
        razao_social: cliente?.empresa?.razao_social,
        cnpj: cliente?.empresa?.cnpj,
        inscricao_estadual: cliente?.empresa?.inscricao_estadual,
      }
    }

    if (cliente?.pessoa || tipoCliente === TipoCliente.PESSOA) {
      return {
        endereco: cliente?.endereco,
        telefone: cliente?.telefone,
        nome: cliente?.pessoa?.nome,
        cpf: cliente?.pessoa?.cpf,
      }
    }
  }

  function getAll(): void {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cliente`)
      .then(async res => {
        if (res.ok) {
          setClientes(await res.json());
        }
      }).catch(e => {
      console.error(e);
    });
  }

  function create(): void {
    if (cliente?.created_at) {
      update();
      return;
    }

    if (tipoCliente === "") {
      setAlert({
        message: "Tipo de pessoa não definido",
        alert_type: AlertType.ERROR,
        emitted_at: new Date()
      });
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cliente/${getPath(tipoCliente)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(makePayload())
    }).then(async res => {
      if (res.ok) {
        setAlert({
          message: "Cliente criado com sucesso",
          alert_type: AlertType.SUCCESS,
          emitted_at: new Date()
        });
        const body = await res.json();
        const cli = body.cliente;
        delete body.cliente;
        clientes.push({
          ...cli,
          [tipoCliente]: body
        });
        setClientes(clientes);
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
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cliente/${getPath(tipoCliente)}/${cliente?.codigo}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(makePayload())
    }).then(async res => {
      if (res.ok) {
        setAlert({
          message: "Cliente atualizado com sucesso",
          alert_type: AlertType.SUCCESS,
          emitted_at: new Date()
        });
        const body = await res.json();
        const cli = body.cliente;
        delete body.cliente;
        const index = clientes.findIndex(
          cliente => cliente.codigo === cli.codigo
        );
        clientes[index] = {
          ...cli,
          [tipoCliente]: body,
        }
        setClientes(clientes);
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

  function remove(cliente: Cliente) {
    const tipo = cliente.empresa ? TipoCliente.EMPRESA : TipoCliente.PESSOA;
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cliente/${getPath(tipo)}/${cliente?.codigo}`, {
      method: "DELETE",
    }).then(async res => {
      if (res.ok) {
        setAlert({
          message: "Cliente removido com sucesso",
          alert_type: AlertType.SUCCESS,
          emitted_at: new Date()
        });
        const cli = await res.json();
        setClientes(clientes.filter(cliente => (cliente.codigo !== cli.cod_cliente)));
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

  function handleInputCliente(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setCliente((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleInputPessoaEmpresa(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    if (tipoCliente === TipoCliente.PESSOA) {
      setCliente((prev) => ({
        ...prev,
        pessoa: {
          ...prev?.pessoa,
          [name]: value
        }
      }));
    }

    if (tipoCliente === TipoCliente.EMPRESA) {
      setCliente((prev) => ({
        ...prev,
        empresa: {
          ...prev?.empresa,
          [name]: value
        }
      }));
    }
  }

  function openModal(cliente: Cliente) {
    setCliente(cliente);
    if (cliente.codigo) {
      setTipoCliente(cliente.empresa ? TipoCliente.EMPRESA : TipoCliente.PESSOA);
    } else {
      setTipoCliente("");
    }
    setShowModal(true);
  }

  return (
    <>
      <Container header={"Cliente"} onNew={()=>{openModal({})}}>
        {
          clientes.map((cliente) => (
            <Card key={cliente.codigo}>
              <div className={"flex flex-row justify-between"}>
                <div className={"w-full"} onClick={()=>{openModal(cliente)}}>
                  <p>{cliente.codigo}</p>
                  <p>{cliente.empresa?.razao_social ?? cliente.pessoa?.nome}</p>
                  <p className={"font-semibold"}>{cliente.empresa ? "Pessoa Jurídica" : "Pessoa Física"}</p>
                </div>
                <button className={"text-red-400"} onClick={()=>{remove(cliente)}}>excluir</button>
              </div>
            </Card>
          ))
        }
      </Container>
      {
        showModal && (
          <Modal header={"Criar/Editar Cliente"}
                 onCancel={()=>{setShowModal(false)}}
                 onOk={()=>{create()}}>
            <Form>
              <Fieldset>
                <label>Tipo de Pessoa</label>
                <select name={"tipo_pessoa"}
                        className={"disabled: border-neutral-300 disabled:bg-neutral-300"}
                        disabled={(tipoCliente !== "") && (cliente?.codigo !== undefined)}
                        defaultValue={tipoCliente}
                        onChange={(event) => {
                          setTipoCliente(event.target.value)
                        }}>
                  <option value={""}>selecione</option>
                  <option value={TipoCliente.PESSOA}>Pessoa Física</option>
                  <option value={TipoCliente.EMPRESA}>Pessoa Jurídica</option>
                </select>
              </Fieldset>
              <hr className={"my-5 border border-neutral-300"} />
              {
                tipoCliente === TipoCliente.PESSOA && (
                  <>
                    <p className={"font-semibold"}>Pessoa Física</p>
                    <div className={"grid grid-cols-2"}>
                      <Fieldset>
                        <label>Nome</label>
                        <input type="text"
                               name={"nome"}
                               defaultValue={cliente?.pessoa?.nome}
                               onInput={handleInputPessoaEmpresa}></input>
                      </Fieldset>
                      <Fieldset>
                        <label>CPF</label>
                        <input type="number"
                               name={"cpf"}
                               defaultValue={cliente?.pessoa?.cpf}
                               onInput={handleInputPessoaEmpresa}></input>
                      </Fieldset>
                    </div>
                  </>
                )
              }
              {
                tipoCliente === TipoCliente.EMPRESA && (
                  <>
                    <p className={"font-semibold"}>Pessoa Jurídica</p>
                    <Fieldset>
                      <label>Razão social</label>
                      <input type="text"
                             name={"razao_social"}
                             defaultValue={cliente?.empresa?.razao_social}
                             onInput={handleInputPessoaEmpresa}></input>
                    </Fieldset>
                    <div className={"grid grid-cols-2"}>
                      <Fieldset>
                        <label>Inscrição estadual</label>
                        <input type="number"
                               name={"inscricao_estadual"}
                               defaultValue={cliente?.empresa?.inscricao_estadual}
                               onInput={handleInputPessoaEmpresa}></input>
                      </Fieldset>
                      <Fieldset>
                        <label>CNPJ</label>
                        <input type="text"
                               name={"cnpj"}
                               defaultValue={cliente?.empresa?.cnpj}
                               onInput={handleInputPessoaEmpresa}></input>
                      </Fieldset>
                    </div>
                  </>
                )
              }
              {
                tipoCliente !== "" && (
                  <div className={"grid grid-cols-2"}>
                    <Fieldset>
                      <label>Endereço</label>
                      <input type="text"
                             name={"endereco"}
                             defaultValue={cliente?.endereco}
                             onInput={handleInputCliente}></input>
                    </Fieldset>
                    <Fieldset>
                      <label>Telefone</label>
                      <input type="tel"
                             name={"telefone"}
                             defaultValue={cliente?.telefone}
                             onInput={handleInputCliente}></input>
                    </Fieldset>
                  </div>
                )
              }
            </Form>
          </Modal>
        )
      }
      <AlertBox alert={alert}></AlertBox>
    </>
  )
}