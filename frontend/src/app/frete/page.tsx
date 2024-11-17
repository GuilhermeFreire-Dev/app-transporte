"use client";

import AlertBox, { Alert, AlertType } from "@/app/components/alert-box";
import Container from "@/app/components/container";
import Card from "@/app/components/card";
import Modal from "@/app/components/modal";
import Form from "@/app/components/form";
import Fieldset from "@/app/components/fieldset";
import React, { useEffect, useState } from "react";

export interface IFrete {
  num_conhecimento: number;
  valor_frete: number;
  icms: number;
  pedagio: number;
  peso: number;
  tipo_cobranca: TipoCobranca;
  data_frete: Date;
  pagador: Pagador;
  cod_cli_remetente: number;
  cod_cli_destinatario: number;
  cod_cidade_origem: number;
  cod_cidade_destino: number;
  num_reg_funcionario: number;
}

export type TipoCobranca = "Pré-Pago" | "Posterior";
export type Pagador = "Remetente" | "Destinatário" | "Terceiros";

export default function Frete() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [fretes, setFretes] = useState<IFrete[]>([]);
  const [frete, setFrete] = useState<IFrete | null>(null);
  const [alert, setAlert] = useState<Alert>({
    message: "",
    alert_type: AlertType.SUCCESS,
    emitted_at: new Date(),
  });

  useEffect(() => {
    getAll();
  }, []);

  const getAll = (): void => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/frete`)
      .then(async (res) => {
        if (res.ok) {
          const data: IFrete[] = await res.json();
          setFretes(data);
        } else {
          const json = await res.json();
          setAlert({
            message: json.message || "Erro ao buscar fretes.",
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
          const newFrete: IFrete = await res.json();
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
            message: json.message || "Erro ao criar frete.",
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
      }
    )
      .then(async (res) => {
        if (res.ok) {
          const updatedFrete: IFrete = await res.json();
          setAlert({
            message: "Frete atualizado com sucesso",
            alert_type: AlertType.SUCCESS,
            emitted_at: new Date(),
          });
          setFretes(
            fretes.map((f) =>
              f.num_conhecimento === updatedFrete.num_conhecimento
                ? updatedFrete
                : f
            )
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

  const remove = (freteToRemove: IFrete): void => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/frete/${freteToRemove.num_conhecimento}`,
      {
        method: "DELETE",
      }
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
              (f) => f.num_conhecimento !== freteToRemove.num_conhecimento
            )
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
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFrete((prev) =>
      prev
        ? {
            ...prev,
            [name]:
              name === "valor_frete" ||
              name === "icms" ||
              name === "pedagio" ||
              name === "peso" ||
              name === "cod_cli_remetente" ||
              name === "cod_cli_destinatario" ||
              name === "cod_cidade_origem" ||
              name === "cod_cidade_destino" ||
              name === "num_reg_funcionario"
                ? Number(value)
                : name === "data_frete"
                ? new Date(value)
                : value,
          }
        : null
    );
  };

  const openModal = (freteToEdit: IFrete | null) => {
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
                <p>Valor do Frete: {frete.valor_frete}</p>
                <p>ICMS: {frete.icms}</p>
                <p>Pedágio: {frete.pedagio}</p>
                <p>Peso: {frete.peso}</p>
                <p>Tipo de Cobrança: {frete.tipo_cobranca}</p>
                <p>
                  Data do Frete:{" "}
                  {new Date(frete.data_frete).toLocaleDateString()}
                </p>
                <p>Pagador: {frete.pagador}</p>
                <p>Cod Cliente Remetente: {frete.cod_cli_remetente}</p>
                <p>Cod Cliente Destinatário: {frete.cod_cli_destinatario}</p>
                <p>Cod Cidade Origem: {frete.cod_cidade_origem}</p>
                <p>Cod Cidade Destino: {frete.cod_cidade_destino}</p>
                <p>
                  Número de Registro do Funcionário: {frete.num_reg_funcionario}
                </p>
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
          header={frete ? "Editar Frete" : "Criar Frete"}
          onCancel={() => setShowModal(false)}
          onOk={() => create()}
        >
          <Form>
            <Fieldset>
              {!frete && <label>Número do Conhecimento</label>}
              {!frete && (
                <input
                  name="num_conhecimento"
                  type="number"
                  onChange={handleInput}
                  required
                />
              )}
              <label>Valor do Frete</label>
              <input
                name="valor_frete"
                type="number"
                value={frete?.valor_frete || ""}
                onChange={handleInput}
                required
              />
              <label>ICMS</label>
              <input
                name="icms"
                type="number"
                value={frete?.icms || ""}
                onChange={handleInput}
                required
              />
              <label>Pedágio</label>
              <input
                name="pedagio"
                type="number"
                value={frete?.pedagio || ""}
                onChange={handleInput}
                required
              />
              <label>Peso</label>
              <input
                name="peso"
                type="number"
                value={frete?.peso || ""}
                onChange={handleInput}
                required
              />
              <label>Tipo de Cobrança</label>
              <select
                name="tipo_cobranca"
                value={frete?.tipo_cobranca || ""}
                onChange={handleInput}
                required
              >
                <option value="">Selecione</option>
                <option value="Pré-Pago">Pré-Pago</option>
                <option value="Posterior">Posterior</option>
              </select>
              <label>Data do Frete</label>
              <input
                name="data_frete"
                type="date"
                value={
                  frete
                    ? new Date(frete.data_frete).toISOString().substr(0, 10)
                    : ""
                }
                onChange={handleInput}
                required
              />
              <label>Pagador</label>
              <select
                name="pagador"
                value={frete?.pagador || ""}
                onChange={handleInput}
                required
              >
                <option value="">Selecione</option>
                <option value="Remetente">Remetente</option>
                <option value="Destinatário">Destinatário</option>
                <option value="Terceiros">Terceiros</option>
              </select>
              <label>Código do Cliente Remetente</label>
              <input
                name="cod_cli_remetente"
                type="number"
                value={frete?.cod_cli_remetente || ""}
                onChange={handleInput}
                required
              />
              <label>Código do Cliente Destinatário</label>
              <input
                name="cod_cli_destinatario"
                type="number"
                value={frete?.cod_cli_destinatario || ""}
                onChange={handleInput}
                required
              />
              <label>Código da Cidade de Origem</label>
              <input
                name="cod_cidade_origem"
                type="number"
                value={frete?.cod_cidade_origem || ""}
                onChange={handleInput}
                required
              />
              <label>Código da Cidade de Destino</label>
              <input
                name="cod_cidade_destino"
                type="number"
                value={frete?.cod_cidade_destino || ""}
                onChange={handleInput}
                required
              />
              <label>Número de Registro do Funcionário</label>
              <input
                name="num_reg_funcionario"
                type="number"
                value={frete?.num_reg_funcionario || ""}
                onChange={handleInput}
                required
              />
            </Fieldset>
          </Form>
        </Modal>
      )}
      <AlertBox alert={alert}></AlertBox>
    </>
  );
}
