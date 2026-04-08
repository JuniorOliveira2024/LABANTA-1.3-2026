-- ============================================================
--  Seed — Dados de Teste
--  Passwords em texto simples → hash bcrypt (rounds=12):
--    "Pedro@123"  → $2a$12$loclVaqCsfD3LIUHbwGL2eDEU6Aj/9YTeiv.IfE2CiJWj7ONBAzOe
--    "Lula@456"   → $2a$12$j8jwmSvHbKwZEnsMO3rCwuepc0Bkjfy2pfRhsqNnHBECiYGtQpnIe
-- ============================================================

USE servidor_local;

-- Utilizadores
INSERT IGNORE INTO tbl_users
    (id, nome, numero_indentificado, email, telefone, numero_utilizador, data_nascimento, localidade, password, enabled, created_at, updated_at)
VALUES
    ('4b016090-c538-4583-b6ba-37032f4ac5c1','Pedro Gomes','M2204','pg266536@gmail.com','5559495','U001','1997-10-21','Fazenda',
     '$2a$12$loclVaqCsfD3LIUHbwGL2eDEU6Aj/9YTeiv.IfE2CiJWj7ONBAzOe', TRUE, NOW(), NOW()),

    ('9840178a-6068-4bb3-8b37-42709c1f7311','Lula Bolusco','M01288','bruittbrnbrn@gmail.com','5555555','U002','1999-02-02','Praia',
     '$2a$12$j8jwmSvHbKwZEnsMO3rCwuepc0Bkjfy2pfRhsqNnHBECiYGtQpnIe', TRUE, NOW(), NOW());

-- Serviços
INSERT IGNORE INTO tbl_servicos (nome, descricao, categoria, enabled, created_at, updated_at) VALUES
    ('Carpintaria','Concerto de portas, janelas, mesas, cadeiras e outros mobiliares','caseiro', TRUE, NOW(), NOW()),
    ('Electricidade','Instalação e reparação de sistemas eléctricos','caseiro', TRUE, NOW(), NOW()),
    ('Canalização','Reparação de canos e sistemas de água','caseiro', TRUE, NOW(), NOW());

-- Prestadores
INSERT IGNORE INTO tbl_prestadores (nif, profissao, taxa_urgencia, minimo_desconto, prescentagem_desconto, disponivel, enabled, created_at, updated_at) VALUES
    (128883998, 'Carpinteiro',   0.200, 1000.00, 0.100, TRUE, TRUE, NOW(), NOW()),
    (987654321, 'Electricista',  0.150,  800.00, 0.080, TRUE, TRUE, NOW(), NOW()),
    (111222333, 'Canalizador',   0.250, 1200.00, 0.120, TRUE, TRUE, NOW(), NOW());

-- Orçamento
INSERT IGNORE INTO tbl_orcamentos (id, total, id_utilizador2, enabled, created_at, updated_at) VALUES
    ('orc-00000001-0000-0000-0000-000000000001', 0, '4b016090-c538-4583-b6ba-37032f4ac5c1', TRUE, NOW(), NOW());

-- Prestação de Serviço
INSERT IGNORE INTO tbl_prestacao_servico (id, designacao, subtorial, horas_estimadas, id_prestadores, id_servico, preco_hora, id_orcamento, estado, enabled, created_at, updated_at) VALUES
    ('ps-00000001-0000-0000-0000-000000000001','Reparação de porta principal',0,4,1,1,50.00,'orc-00000001-0000-0000-0000-000000000001','pendente',TRUE,NOW(),NOW());

-- Propostas
INSERT IGNORE INTO tbl_proposta (id_prestacao_servico, preco_hora, horas_estimadas, estado, enabled, created_at, updated_at) VALUES
    ('ps-00000001-0000-0000-0000-000000000001', 50.00, 4, 'pendente', TRUE, NOW(), NOW()),
    ('ps-00000001-0000-0000-0000-000000000001', 45.00, 5, 'pendente', TRUE, NOW(), NOW());
