import "dotenv/config"
import mysql from "mysql2/promise"

async function setupDatabase() {
    try {
        // Tentar várias combinações de credenciais
        const credentials = [
            { user: "root", password: "" },
            { user: "root", password: "root" },
            { user: "root", password: "password" },
            { user: "root", password: "Pedro$08Fz00" },
            { user: "root", password: "123456" },
            { user: "admin", password: "" },
        ]

        let connection;

        for (const cred of credentials) {
            try {
                console.log(`Tentando conectar com ${cred.user}:${cred.password || "(sem senha)"}`)
                connection = await mysql.createConnection({
                    host: process.env.DB_HOST || "localhost",
                    user: cred.user,
                    password: cred.password,
                })
                console.log(`✅ Conectado como ${cred.user}!`)
                break;
            } catch (error) {
                console.log(`❌ Falhou com ${cred.user}`)
                continue;
            }
        }

        if (!connection) {
            throw new Error("Nenhuma credencial funcionou!")
        }

        // Criar banco de dados
        console.log("Criando banco de dados...")
        await connection.execute(`CREATE DATABASE IF NOT EXISTS servidor_local CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`)

        // Selecionar banco
        await connection.execute("USE servidor_local")

        // Criar tabelas
        const tableQueries = [
            `CREATE TABLE IF NOT EXISTS tbl_users (
                id VARCHAR(36) PRIMARY KEY NOT NULL,
                nome VARCHAR(100) NOT NULL,
                numero_indentificado VARCHAR(50),
                email VARCHAR(255) NOT NULL UNIQUE,
                telefone VARCHAR(30),
                numero_utilizador VARCHAR(50),
                data_nascimento DATE,
                localidade VARCHAR(100),
                password VARCHAR(255) NOT NULL,
                enabled BOOLEAN NOT NULL DEFAULT TRUE,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )`,
            `CREATE TABLE IF NOT EXISTS tbl_servicos (
                id INT PRIMARY KEY AUTO_INCREMENT,
                nome VARCHAR(100) NOT NULL,
                descricao VARCHAR(255),
                categoria VARCHAR(50) NOT NULL,
                enabled BOOLEAN NOT NULL DEFAULT TRUE,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )`,
        ]

        for (const query of tableQueries) {
            await connection.execute(query)
        }

        console.log("✅ Banco de dados configurado com sucesso!")
        await connection.end()
    } catch (error) {
        process.exit(1)
    }
}

setupDatabase()
