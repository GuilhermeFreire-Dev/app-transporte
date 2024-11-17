"use client";

import AlertBox, { Alert, AlertType } from "@/app/components/alert-box";
import Container from "@/app/components/container";
import Card from "@/app/components/card";
import Modal from "@/app/components/modal";
import Form from "@/app/components/form";
import Fieldset from "@/app/components/fieldset";
import React, { useEffect, useState } from "react";
import { Cidade } from "@/app/cidade/page";
import { Funcionario } from "@/app/funcionario/page";

type Frete = {
  num_conhecimento?: number;
  valor_frete?: number;
  icms?: number;
  pedagio?: number;
  peso?: number;
  data_frete?: string;
  cod_cli_remetente?: number;
  cod_cli_destinatario?: number;
  cod_cidade_origem?: number;
  cod_cidade_destino?: number;
  num_reg_funcionario?: number;
  tipo_cobranca?: TipoCobranca;
  pagador?: Pagador;
  created_at?: string;
  updated_at?: string;
}

enum Pagador {
  REMETENTE = "remetente",
  DESTINATARIO = "destinatario",
}

enum TipoCobranca {
  PESO = "peso",
  VALOR = "valor",
}

export default function Frete() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [fretes, setFretes] = useState<Frete[]>(Array<Frete>);
  const [frete, setFrete] = useState<Frete | null>(null);
  const [cidades, setCidades] = useState<Cidade[]>(Array<Cidade>);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>(Array<Funcionario>);
  const [alert, setAlert] = useState<Alert>({
    message: "",
    alert_type: AlertType.SUCCESS,
    emitted_at: new Date(),
  });

  useEffect(() => {
    getAll();
    getAllCidades();
    getAllFuncionarios();
  }, []);

  const getAll = (): void => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/frete`)
      .then(async (res) => {
        if (res.ok) {
          setFretes(await res.json());
        } else {
          const json = await res.json();
          setAlert({
            message: json.message,
            alert_type: AlertType.ERROR,
            emitted_at: new Date(),
          });
        }
      })
      .catch((e) => {
        console.error(e);
        setAlert({
          message: "Erro de conexão com o servidor.",
          alert_type: AlertType.ERROR,
          emitted_at: new Date(),
        });
      });
  };

  function getAllCidades() {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cidade`)
    .then(async (res) => {
      if (res.ok) {
        setCidades(await res.json());
      } else {
        const json = await res.json();
        setAlert({
          message: json.message,
          alert_type: AlertType.ERROR,
          emitted_at: new Date(),
        });
      }
    })
    .catch((e) => {
      console.error(e);
    });
  }

  function getAllFuncionarios() {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/funcionario`)
    .then(async (res) => {
      if (res.ok) {
        setFuncionarios(await res.json());
      } else {
        const json = await res.json();
        setAlert({
          message: json.message,
          alert_type: AlertType.ERROR,
          emitted_at: new Date(),
        });
      }
    })
    .catch((e) => {
      console.error(e);
    });
  }

  const create = (): void => {
    if (frete?.num_conhecimento) {
      update();
      return;
    }

    if (!frete) return;

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/frete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(frete),
    })
      .then(async (res) => {
        if (res.ok) {
          const newFrete: Frete = await res.json();
          setAlert({
            message: "Frete criado com sucesso",
            alert_type: AlertType.SUCCESS,
            emitted_at: new Date(),
          });
          setFretes([...fretes, newFrete]);
          setShowModal(false);
        } else {
          const json = await res.json();
          setAlert({
            message: json.message,
            alert_type: AlertType.ERROR,
            emitted_at: new Date(),
          });
        }
      })
      .catch((e) => {
        console.error(e);
        setAlert({
          message: "Erro de conexão com o servidor.",
          alert_type: AlertType.ERROR,
          emitted_at: new Date(),
        });
      });
  };

  const update = (): void => {
    if (!frete?.num_conhecimento) return;

    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/frete/${frete.num_conhecimento}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(frete),
      },
    )
      .then(async (res) => {
        if (res.ok) {
          const updatedFrete: Frete = await res.json();
          setAlert({
            message: "Frete atualizado com sucesso",
            alert_type: AlertType.SUCCESS,
            emitted_at: new Date(),
          });
          setFretes(
            fretes.map((f) =>
              f.num_conhecimento === updatedFrete.num_conhecimento
                ? updatedFrete
                : f,
            ),
          );
          setShowModal(false);
        } else {
          const json = await res.json();
          setAlert({
            message: json.message || "Erro ao atualizar frete.",
            alert_type: AlertType.ERROR,
            emitted_at: new Date(),
          });
        }
      })
      .catch((e) => {
        console.error(e);
        setAlert({
          message: "Erro de conexão com o servidor.",
          alert_type: AlertType.ERROR,
          emitted_at: new Date(),
        });
      });
  };

  const remove = (freteToRemove: Frete): void => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/frete/${freteToRemove.num_conhecimento}`,
      {
        method: "DELETE",
      },
    )
      .then(async (res) => {
        if (res.ok) {
          setAlert({
            message: "Frete removido com sucesso",
            alert_type: AlertType.SUCCESS,
            emitted_at: new Date(),
          });
          setFretes(
            fretes.filter(
              (f) => f.num_conhecimento !== freteToRemove.num_conhecimento,
            ),
          );
        } else {
          const json = await res.json();
          setAlert({
            message: json.message || "Erro ao remover frete.",
            alert_type: AlertType.ERROR,
            emitted_at: new Date(),
          });
        }
      })
      .catch((e) => {
        console.error(e);
        setAlert({
          message: "Erro de conexão com o servidor.",
          alert_type: AlertType.ERROR,
          emitted_at: new Date(),
        });
      });
  };

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    const v = [
      "valor_frete",
      "icms",
      "pedagio",
      "peso",
      "cod_cli_remetente",
      "cod_cli_destinatario",
      "cod_cidade_origem",
      "cod_cidade_destino",
      "num_reg_funcionario"
    ].includes(name) ? Number(value) : value;
    setFrete((prev) => ({
      ...prev,
      [name]: v,
    }));
  };

  const openModal = (freteToEdit: Frete | null) => {
    setFrete(freteToEdit);
    setShowModal(true);
  };

  return (
    <>
      <Container header={"Frete"} onNew={() => openModal(null)}>
        {fretes.map((frete) => (
          <Card key={frete.num_conhecimento}>
            <div className={"flex flex-row justify-between"}>
              <div className={"w-full"} onClick={() => openModal(frete)}>
                <p>Número do Conhecimento: {frete.num_conhecimento}</p>
                <p>Peso: {frete.peso}</p>
                <p>Tipo de Cobrança: {frete.tipo_cobranca}</p>
                <p>Pagador: {frete.pagador}</p>
              </div>
              <button className={"text-red-400"} onClick={() => remove(frete)}>
                Excluir
              </button>
            </div>
          </Card>
        ))}
      </Container>
      {showModal && (
        <Modal
          header={"Criar/Editar Frete"}
          onCancel={() => setShowModal(false)}
          onOk={() => create()}
        >
          <Form>
            <div className={"grid grid-cols-3"}>
              <Fieldset>
                <label>Valor do Frete</label>
                <input name={"valor_frete"} type={"number"}
                       defaultValue={frete?.valor_frete}
                       onChange={handleInput}
                       required/>
              </Fieldset>
              <Fieldset>
                <label>ICMS</label>
                <input name={"icms"} type={"number"}
                       defaultValue={frete?.icms}
                       onChange={handleInput}
                       required/>
              </Fieldset>
              <Fieldset>
                <label>Pedágio</label>
                <input name={"pedagio"} type={"number"}
                       defaultValue={frete?.pedagio}
                       onChange={handleInput}
                       required/>
              </Fieldset>
            </div>
            <div className={"grid grid-cols-3"}>
              <Fieldset>
                <label>Peso</label>
                <input name={"peso"} type={"number"}
                       defaultValue={frete?.peso}
                       onChange={handleInput}
                       required/>
              </Fieldset>
              <Fieldset>
                <label>Tipo de Cobrança</label>
                <select name={"tipo_cobranca"}
                        defaultValue={frete?.tipo_cobranca}
                        onChange={handleInput}
                        required>
                  <option value="">Selecione</option>
                  <option value={TipoCobranca.PESO}>peso</option>
                  <option value={TipoCobranca.VALOR}>valor</option>
                </select>
              </Fieldset>
              <Fieldset>
                <label>Data do Frete</label>
                <input name={"data_frete"} type={"date"}
                       defaultValue={frete?.data_frete?.replace(/T.*$/, '')}
                       onChange={handleInput}
                       required/>
              </Fieldset>
            </div>
            <div className={"grid grid-cols-3"}>
              <Fieldset>
                <label>Pagador</label>
                <select name={"pagador"}
                        defaultValue={frete?.pagador}
                        onChange={handleInput}
                        required>
                  <option value={""}>Selecione</option>
                  <option value={Pagador.REMETENTE}>remetente</option>
                  <option value={Pagador.DESTINATARIO}>destinatário</option>
                </select>
              </Fieldset>
              <Fieldset>
                <label>Código do Cliente Remetente</label>
                <input name={"cod_cli_remetente"} type={"number"}
                       defaultValue={frete?.cod_cli_remetente}
                       onChange={handleInput}
                       required/>
              </Fieldset>
              <Fieldset>
                <label>Código do Cliente Destinatário</label>
                <input name={"cod_cli_destinatario"} type={"number"}
                       defaultValue={frete?.cod_cli_destinatario}
                       onChange={handleInput}
                       required/>
              </Fieldset>
            </div>
            <div className={"grid grid-cols-3"}>
              <Fieldset>
                <label>Cidade de origem</label>
                <select name={"cod_cidade_origem"}
                        defaultValue={frete?.cod_cidade_origem}
                        onChange={handleInput}>
                  <option>Selecione</option>
                  {
                    cidades.map(cidade => (
                      <option key={cidade.codigo}
                              value={cidade.codigo}>
                        {`${cidade.nome} - ${cidade.uf_cidade}`}
                      </option>
                    ))
                  }
                </select>
              </Fieldset>
              <Fieldset>
                <label>Cidade de destino</label>
                <select name={"cod_cidade_destino"}
                        defaultValue={frete?.cod_cidade_destino}
                        onChange={handleInput}>
                  <option>Selecione</option>
                  {
                    cidades.map(cidade => (
                      <option key={cidade.codigo}
                              value={cidade.codigo}>
                        {`${cidade.nome} - ${cidade.uf_cidade}`}
                      </option>
                    ))
                  }
                </select>
              </Fieldset>
              <Fieldset>
                <label>Funcionário</label>
                <select name={"num_reg_funcionario"}
                        defaultValue={frete?.num_reg_funcionario}
                        onChange={handleInput}>
                  <option>Selecione</option>
                  {
                    funcionarios.map(funcionario => (
                      <option key={funcionario.num_registro}
                              value={funcionario.num_registro}>
                        {`${funcionario.nome}`}
                      </option>
                    ))
                  }
                </select>
              </Fieldset>
            </div>
          </Form>
        </Modal>
      )}
      <AlertBox alert={alert}></AlertBox>
    </>
  );
}
