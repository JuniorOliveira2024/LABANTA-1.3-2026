import swaggerJsdoc from 'swagger-jsdoc'
import path from 'path'

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Api Servidor Local",
            description: 'Plataforma de Gestão de Prestadores e Serviços',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:8080',
                description: 'dev',
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerformat: "JWT"
                }
            }
        },
        securtiy: [
            {
                bearerAuth: []
            }
        ],
    },
    // ✅ apis deve estar AQUI, fora de definition
    apis: [
        path.join(process.cwd(), "./src/Docs/schemas/*.yaml"),
        path.join(process.cwd(), "./src/Docs/paths/*.yaml"),
    ]
}

export const swaggerSpec = swaggerJsdoc(options);