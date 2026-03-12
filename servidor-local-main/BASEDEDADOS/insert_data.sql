INSERT INTO tabela_utilizadores (
	 id,
	 nome,
	 numero,
	 data_nascimento,
	 email, 
	 telefone, 
	 pais, 
	 localidade,
	 `password`, 
	 enabled,
	 created_at,
	 update_at
) VALUES (
	"52c42e26-557e-45e7-a874-801091dd3323",
	"Tiago Soares",
	"M001K",
	"1997-10-21",
	"elvizoares1@gmail.com",
	"9948113",
	"Cabo Verde",
	"Assomada",
	"$2a$12$gC6/5o0aJURdlmb3eJHTF.YqbxXhuDbCiS82xPNqK1JqEZ5IlyDaW",
	true,
	NOW(),
	NOW()
);

INSERT INTO tabela_orcamento
VALUES(
	NULL,
	200,
    "52c42e26-557e-45e7-a874-801091dd3323",
    true,
    NOW(),
    NOW()
);

INSERT INTO tabela_servicos
VALUES(
	"4b0570e1-58f4-46d9-84bb-339ae84c0cc9",
    "servicotest1",
    20,
    'teste1',
    true,
    NOW(),
    NOW()
)