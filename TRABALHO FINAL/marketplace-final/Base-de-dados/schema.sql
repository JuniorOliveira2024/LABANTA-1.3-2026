-- ============================================================
--  Marketplace de Serviços — Schema Completo
-- ============================================================

CREATE DATABASE IF NOT EXISTS servidor_local
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE servidor_local;

-- ─── Utilizadores ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tbl_users (
    id               VARCHAR(36)  PRIMARY KEY NOT NULL,
    nome             VARCHAR(100) NOT NULL,
    numero_indentificado VARCHAR(50),
    email            VARCHAR(255) NOT NULL UNIQUE,
    telefone         VARCHAR(30),
    numero_utilizador VARCHAR(50),
    data_nascimento  DATE,
    localidade       VARCHAR(100),
    password         VARCHAR(255) NOT NULL,
    enabled          BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ─── Prestadores ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tbl_prestadores (
    id                   INT          PRIMARY KEY AUTO_INCREMENT,
    nif                  BIGINT       NOT NULL UNIQUE,
    profissao            VARCHAR(100) NOT NULL,
    taxa_urgencia        DECIMAL(5,3) NOT NULL DEFAULT 0.000,
    minimo_desconto      DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    prescentagem_desconto DECIMAL(5,3) NOT NULL DEFAULT 0.000,
    disponivel           BOOLEAN      NOT NULL DEFAULT TRUE,
    enabled              BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at           DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at           DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ─── Serviços ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tbl_servicos (
    id          INT          PRIMARY KEY AUTO_INCREMENT,
    nome        VARCHAR(100) NOT NULL,
    descricao   VARCHAR(255),
    categoria   VARCHAR(50)  NOT NULL,
    enabled     BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ─── Orçamentos ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tbl_orcamentos (
    id              VARCHAR(36)  PRIMARY KEY NOT NULL,
    total           DOUBLE       NOT NULL DEFAULT 0,
    id_utilizador2  VARCHAR(36)  NOT NULL,
    enabled         BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_orcamento_user
        FOREIGN KEY (id_utilizador2) REFERENCES tbl_users(id)
        ON DELETE CASCADE
);

-- ─── Prestação de Serviço ────────────────────────────────────
CREATE TABLE IF NOT EXISTS tbl_prestacao_servico (
    id               VARCHAR(36)  PRIMARY KEY NOT NULL,
    designacao       VARCHAR(255) NOT NULL,
    subtorial        DOUBLE       NOT NULL DEFAULT 0,
    horas_estimadas  INT          NOT NULL DEFAULT 0,
    id_prestadores   INT          NOT NULL,
    id_servico       INT          NOT NULL,
    preco_hora       DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    id_orcamento     VARCHAR(36)  NOT NULL,
    estado           ENUM('pendente','enprogresso','cancelado','finalizado') NOT NULL DEFAULT 'pendente',
    enabled          BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_prestacao_prestador
        FOREIGN KEY (id_prestadores) REFERENCES tbl_prestadores(id),
    CONSTRAINT fk_prestacao_servico
        FOREIGN KEY (id_servico) REFERENCES tbl_servicos(id),
    CONSTRAINT fk_prestacao_orcamento
        FOREIGN KEY (id_orcamento) REFERENCES tbl_orcamentos(id)
        ON DELETE CASCADE
);

-- ─── Propostas ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tbl_proposta (
    id                   INT          PRIMARY KEY AUTO_INCREMENT,
    id_prestacao_servico VARCHAR(36)  NOT NULL,
    preco_hora           DECIMAL(10,2) NOT NULL,
    horas_estimadas      INT          NOT NULL,
    estado               ENUM('pendente','Aceitada','Rejeitada') NOT NULL DEFAULT 'pendente',
    enabled              BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at           DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at           DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_proposta_prestacao
        FOREIGN KEY (id_prestacao_servico) REFERENCES tbl_prestacao_servico(id)
        ON DELETE CASCADE
);
