
CREATE TABLE tabela_prestadores(
	id VARCHAR(255) PRIMARY KEY NOT NULL,
	nif INT NOT NULL,
    precoHora DECIMAL(10, 2) NOT NULL,
    profissao VARCHAR(100) NOT NULL,
    minimoDesconto DECIMAL(10, 2),
    taxaUrgencia DECIMAL(10, 3),
    percentagemDesconto DECIMAL(10, 3),
    disponivel BOOLEAN NOT NULL,
    enabled BOOLEAN NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);

ALTER TABLE tabela_prestadores
    DROP COLUMN taxaUrgencia,
    ADD COLUMN taxa_urgencia DECIMAL(10, 3) AFTER profissao,
    DROP COLUMN minimoDesconto,
    ADD COLUMN minimo_desconto DECIMAL(10, 3) AFTER taxa_urgencia,
    DROP COLUMN percentagemDesconto,
    ADD COLUMN percentagem_desconto DECIMAL(10, 3) AFTER minimo_desconto,
    DROP COLUMN precoHora
;

CREATE TABLE IF NOT EXISTS `tabela_orcamento` (
	`id` INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
	`total` DOUBLE NOT NULL,
	`id_utilizadores` VARCHAR(255) NOT NULL,
	`enabled` BOOLEAN NOT NULL,
	`created_at` DATETIME NOT NULL,
	`updated_at` DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS `tabela_prestacao_servico` (
	`id` INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
	`designacao` VARCHAR(100) NOT NULL,
	`subtotal` DOUBLE NOT NULL,
	`horas_estimadas` INTEGER,
	`id_prestador` VARCHAR(255) NOT NULL,
	`id_servico` INTEGER NOT NULL,
	`preco_hora` DOUBLE,
	`estado` ENUM('pendente', 'em_progresso', 'finalizado', 'cancelado') NOT NULL,
	`id_orcamento` INTEGER,
	`enabled` BOOLEAN NOT NULL,
	`created_at` DATETIME NOT NULL,
	`updated_at` DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS `tabela_proposta` (
	`id` INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
	`id_prestacao_servico` INTEGER NOT NULL,
	`preco_hora` DOUBLE NOT NULL,
	`horas_estimadas` INTEGER NOT NULL,
	`estado` ENUM('pendente', 'aceito', 'recusado') NOT NULL,
	`enabled` BOOLEAN NOT NULL,
	`created_at` DATETIME NOT NULL,
	`updated_at` DATETIME NOT NULL
);

ALTER TABLE tabela_proposta
	ADD CONSTRAINT fk_prestacao_servico_proposta
	FOREIGN KEY (id_prestacao_servico)
    REFERENCES tabela_prestacao_servico(id)
;

ALTER TABLE tabela_prestacao_servico
	ADD CONSTRAINT fk_prestadores_prestacao_servico
    FOREIGN KEY (id_prestador)
    REFERENCES tabela_prestadores(id), 
    ADD CONSTRAINT fk_servico_prestacao_servico
    FOREIGN KEY (id_servico)
    REFERENCES tabela_servicos(id)
;
