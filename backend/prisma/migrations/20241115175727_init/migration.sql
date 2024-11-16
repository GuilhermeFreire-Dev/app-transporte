-- CreateEnum
CREATE TYPE "TipoCobranca" AS ENUM ('PESO', 'VALOR');

-- CreateEnum
CREATE TYPE "Pagador" AS ENUM ('REMETENTE', 'DESTINATARIO');

-- CreateTable
CREATE TABLE "Estado" (
    "uf" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "icms_local" DOUBLE PRECISION NOT NULL,
    "icms_outro_if" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Estado_pkey" PRIMARY KEY ("uf")
);

-- CreateTable
CREATE TABLE "Cidade" (
    "codigo" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "uf_cidade" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cidade_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "codigo" SERIAL NOT NULL,
    "data_insc" TIMESTAMP(3) NOT NULL,
    "endereco" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "PessoaFisica" (
    "codigo" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "cod_cliente" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PessoaFisica_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "PessoaJuridica" (
    "codigo" SERIAL NOT NULL,
    "razao_social" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "inscricao_estadual" TEXT NOT NULL,
    "cod_cliente" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PessoaJuridica_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "Funcionario" (
    "num_registro" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Funcionario_pkey" PRIMARY KEY ("num_registro")
);

-- CreateTable
CREATE TABLE "Frete" (
    "num_conhecimento" SERIAL NOT NULL,
    "valor_frete" DOUBLE PRECISION NOT NULL,
    "icms" DOUBLE PRECISION NOT NULL,
    "pedagio" DOUBLE PRECISION NOT NULL,
    "peso" DOUBLE PRECISION NOT NULL,
    "tipo_cobranca" "TipoCobranca" NOT NULL,
    "data_frete" TIMESTAMP(3) NOT NULL,
    "pagador" "Pagador" NOT NULL,
    "cod_cli_remetente" INTEGER NOT NULL,
    "cod_cli_destinatario" INTEGER NOT NULL,
    "cod_cidade_origem" INTEGER NOT NULL,
    "cod_cidade_destino" INTEGER NOT NULL,
    "num_reg_funcionario" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Frete_pkey" PRIMARY KEY ("num_conhecimento")
);

-- CreateIndex
CREATE UNIQUE INDEX "PessoaFisica_cpf_key" ON "PessoaFisica"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "PessoaFisica_cod_cliente_key" ON "PessoaFisica"("cod_cliente");

-- CreateIndex
CREATE UNIQUE INDEX "PessoaJuridica_cnpj_key" ON "PessoaJuridica"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "PessoaJuridica_cod_cliente_key" ON "PessoaJuridica"("cod_cliente");

-- CreateIndex
CREATE UNIQUE INDEX "Frete_cod_cidade_origem_key" ON "Frete"("cod_cidade_origem");

-- CreateIndex
CREATE UNIQUE INDEX "Frete_cod_cidade_destino_key" ON "Frete"("cod_cidade_destino");

-- CreateIndex
CREATE UNIQUE INDEX "Frete_num_reg_funcionario_key" ON "Frete"("num_reg_funcionario");

-- AddForeignKey
ALTER TABLE "Cidade" ADD CONSTRAINT "Cidade_uf_cidade_fkey" FOREIGN KEY ("uf_cidade") REFERENCES "Estado"("uf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PessoaFisica" ADD CONSTRAINT "PessoaFisica_cod_cliente_fkey" FOREIGN KEY ("cod_cliente") REFERENCES "Cliente"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PessoaJuridica" ADD CONSTRAINT "PessoaJuridica_cod_cliente_fkey" FOREIGN KEY ("cod_cliente") REFERENCES "Cliente"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Frete" ADD CONSTRAINT "Frete_cod_cli_remetente_fkey" FOREIGN KEY ("cod_cli_remetente") REFERENCES "Cliente"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Frete" ADD CONSTRAINT "Frete_cod_cli_destinatario_fkey" FOREIGN KEY ("cod_cli_destinatario") REFERENCES "Cliente"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Frete" ADD CONSTRAINT "Frete_cod_cidade_origem_fkey" FOREIGN KEY ("cod_cidade_origem") REFERENCES "Cidade"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Frete" ADD CONSTRAINT "Frete_cod_cidade_destino_fkey" FOREIGN KEY ("cod_cidade_destino") REFERENCES "Cidade"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;
