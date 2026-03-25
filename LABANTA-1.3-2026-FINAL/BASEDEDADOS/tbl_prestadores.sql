USE servidor_local;

CREATE TABLE tbl_prestadores(
	id VARCHAR(255) PRIMARY KEY NOT NULL,
    nif INT NOT NULL,
    precoHora DECIMAL(10,2) NOT NULL,
    profissao VARCHAR(100) NOT NULL,
    minimoDesconto DECIMAL(10,2),
    taxaUrgencia DECIMAL(10,3),
    percentagemDesconto DECIMAL(10,3),
    disponivel BOOLEAN NOT NULL,
    enabled BOOLEAN NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);