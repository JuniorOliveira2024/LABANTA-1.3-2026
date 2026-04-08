# Marketplace de Serviços — API REST

API REST em **Node.js + TypeScript + Express + MySQL** para gestão de um marketplace de serviços locais.

---

## Pré-requisitos

- Node.js ≥ 18
- MySQL 8.x
- npm

---

## Instalação

```bash
npm install
```

---

## Base de Dados

```sql
-- 1. Criar schema + tabelas
mysql -u root -p < Base-de-dados/schema.sql

-- 2. Inserir dados de teste
mysql -u root -p servidor_local < Base-de-dados/seed.sql
```

**Credenciais de teste (seed):**

| Email | Password |
|-------|----------|
| pg266536@gmail.com | Pedro@123 |
| bruittbrnbrn@gmail.com | Lula@456 |

---

## Variáveis de Ambiente (.env)

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=a_tua_password
DB_NAME=servidor_local
JWT_SECRET=um_segredo_longo_e_aleatorio
PORT=8080
```

---

## Arranque

```bash
# Desenvolvimento (hot-reload)
npm run dev

# Produção
npm start
```

---

## Documentação Swagger

Após arrancar: **http://localhost:8080/docs**

---

## Rotas da API

### User `/user`
| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| POST | `/user/create` | ❌ | Criar utilizador |
| POST | `/user/login` | ❌ | Login → JWT |
| GET | `/user` | ✅ | Listar todos |
| GET | `/user/:id` | ✅ | Buscar por ID |
| PUT | `/user/:id` | ✅ | Actualizar |
| DELETE | `/user/:id` | ✅ | Apagar |
| PUT | `/user/:id/update-password` | ✅ | Alterar password (valida antiga) |
| PUT | `/user/:id/reset-password` | ❌ | Redefinir password (admin) |

### Orçamento `/orcamento`
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/orcamento/create` | Criar |
| GET | `/orcamento` | Listar todos |
| GET | `/orcamento/get-por-id/:id` | Buscar por ID |
| PUT | `/orcamento/update/:id` | Actualizar |
| DELETE | `/orcamento/delete/:id` | Apagar |
| PUT | `/orcamento/:id/calcular-valor-total` | **Calcular total com regras de negócio** |

### Proposta `/proposta`
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/proposta/create` | Criar |
| GET | `/proposta` | Listar todas |
| GET | `/proposta/:id` | Buscar por ID |
| PUT | `/proposta/:id` | Actualizar |
| DELETE | `/proposta/:id` | Apagar |
| PUT | `/proposta/aceitar/:id` | **Aceitar (cascata: rejeita concorrentes + actualiza prestação)** |

### Prestador `/prestador`
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/prestador/create` | Criar |
| GET | `/prestador` | Listar todos |
| GET | `/prestador/get-by-id/:id` | Buscar por ID |
| PUT | `/prestador/update/:id` | Actualizar |
| DELETE | `/prestador/delete/:id` | Apagar |

### Serviço `/service`
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/service/create` | Criar |
| GET | `/service` | Listar todos |
| GET | `/service/get-by-id/:id` | Buscar por ID |
| PUT | `/service/update/:id` | Actualizar |
| DELETE | `/service/delete/:id` | Apagar |

### Prestação de Serviço `/prestacao`
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/prestacao/create` | Criar |
| GET | `/prestacao` | Listar todas |
| GET | `/prestacao/get-by-id/:id` | Buscar por ID |
| PUT | `/prestacao/update/:id` | Actualizar |
| DELETE | `/prestacao/delete/:id` | Apagar |

---

## Regras de Negócio

### Calcular Total do Orçamento
Para cada prestação de serviço ligada ao orçamento:
1. `subtotal = preco_hora × horas_estimadas`
2. Se `subtotal >= minimo_desconto` do prestador → aplica `prescentagem_desconto`
3. Sobre o valor com desconto → aplica `taxa_urgencia`
4. Soma todos os totais → grava em `tbl_orcamentos.total`

### Aceitar Proposta (transacção atómica)
1. Busca a proposta e o `id_prestacao_servico`
2. Rejeita todas as propostas concorrentes (mesmo `id_prestacao_servico`, estado `pendente`)
3. Marca esta proposta como `Aceitada`
4. Actualiza `tbl_prestacao_servico.estado` para `enprogresso`

### Update Password
Requer `oldPassword` (validado com `bcrypt.compare()`) + `newPassword`. Apenas grava o novo hash se a password antiga estiver correcta.

---

## Formato de Resposta (Contrato Padrão)

Todas as rotas respondem com o mesmo formato:

```json
{
  "status": "success" | "error",
  "message": "Descrição do resultado",
  "data": { ... } | null
}
```
