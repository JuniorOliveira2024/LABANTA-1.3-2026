import "dotenv/config"
import mysql from "mysql2/promise"

async function testConnection() {
    try {
        console.log("Tentando conectar ao banco de dados...")
        console.log("Host:", process.env.DB_HOST)
        console.log("User:", process.env.DB_USER)
        console.log("Database:", process.env.DB_NAME)
        
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || "localhost",
            user: process.env.DB_USER || "root",
            password: "", // Testando com senha vazia
            // database: process.env.DB_NAME || "servidor_local", // Sem especificar banco
        })
        
        console.log("✅ Conectado com sucesso!")
        const result = await connection.execute("SELECT 1")
        console.log("✅ Query executada com sucesso!")
        await connection.end()
    } catch (error) {
        console.error("❌ Erro de conexão:", error)
    }
}

testConnection()
