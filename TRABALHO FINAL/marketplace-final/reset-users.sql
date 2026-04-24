-- Criar usuário 'marketplace' sem senha (para testes)
CREATE USER IF NOT EXISTS 'marketplace'@'localhost' IDENTIFIED BY '';

-- Dar todas as permissões ao usuário
GRANT ALL PRIVILEGES ON *.* TO 'marketplace'@'localhost';

-- Flush privileges
FLUSH PRIVILEGES;

-- Criar usuário root com senha vazia (se não existir)
CREATE USER IF NOT EXISTS 'root'@'localhost' IDENTIFIED BY '';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
