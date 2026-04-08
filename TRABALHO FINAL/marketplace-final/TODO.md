# TODO: Correcções e Estado do Projeto

## Correcções Aplicadas ✅

### Bugs Críticos Corrigidos
- [x] **auth.middleware.ts** — Código morto fora da função (blocos `req:{}` e `const nome`) removido; import inútil de `json` eliminado.
- [x] **orcamento.controller.ts** — Import inútil `import type { create } from "node:domain"` removido.
- [x] **orcamento.models.ts** — `OrcamentoModelValorTotal` não retornava valor em sucesso; corrigido para retornar `{ valorTotal }`.
- [x] **prestacao.servico.ts** (model) — INSERT com 9 valores mas 12 `?` no SQL corrigido; UPDATE tinha parâmetros errados/em falta, corrigido.
- [x] **prestador.models.ts** — INSERT tinha 11 `?` mas só 10 colunas (coluna `id` removida pois é AUTO_INCREMENT); import inútil `id` de `date-fns/locale` removido.
- [x] **prestador.controller.ts** — Lógica invertida no `create` (`if (createPrestadorResponse)` → `if (!createPrestadorResponse)`); `getAll` e `get` não retornavam `data`; `update` retornava 400 em vez de 200; status 404 no `get` quando não encontrado.
- [x] **proposta.models.ts** — `getAll` e `get` usavam tabela errada `tbl_orcamento` (corrigido para `tbl_proposta`); `update` sem `WHERE id=?` (qualquer update apagava todos os registos!); `PropostaAceita` tinha SQL completamente inválido — reescrito com lógica correcta (rejeita todas as outras propostas da mesma prestação, aceita apenas a seleccionada).
- [x] **proposta.controller.ts** — Lógica invertida no `create`; `getAll`, `get`, `update` e `AceitarProposta` não retornavam `data`; `update` e `AceitarProposta` retornavam 400 em vez de 200.
- [x] **servico.controller.ts** — Lógica invertida no `create`; `getAll`, `get`, `update` não retornavam `data`; `update` retornava 400 em vez de 200; status 404 no `get`.
- [x] **servico.modles.ts** — `getAll` usava tabela errada `tbl_servico` (corrigido para `tbl_servicos`).
- [x] **user.models.ts** — Query INSERT tinha 10 colunas mas 12 `?` corrigido; `getByEmail`, `updatePassword` e `resetPassword` usavam tabela errada `tbl_utilizadores` (corrigido para `tbl_users`); `resetPassword` usava coluna errada `update_at` (corrigido para `updated_at`); import inútil `create` de `node:domain` removido.
- [x] **users.controler.ts** — Lógica invertida no `create`; `getAll` e `get` não retornavam `data`; `update` retornava 400; `resetPassword` tinha `console.log` após o `return` (código morto); imports inúteis (`get` de `node:http`, `getUsersById`/`updateUser` de `users.js`, `db`, `ServiceDBType`/`UserType`) removidos.
- [x] **servicos.route.ts** — Rota `getById` chamava `ServiceController.getAll` em vez de `ServiceController.get`.
- [x] **proposta.route.ts** — Rota `PUT /aceitar/:id` estava registada DEPOIS de `PUT /:id`, tornando-a inacessível; movida para antes.

## Estado Actual
Todos os erros identificados foram corrigidos. O projeto está pronto para `npm install && npm run dev`.
