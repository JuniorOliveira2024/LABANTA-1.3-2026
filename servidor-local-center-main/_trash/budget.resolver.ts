import { budgetModel } from "../servidor-local/src/models/orcamentos.model.js";
import { PrestacaoServicoModel } from "../servidor-local/src/models/prestacao-servico.model.js";
import { UsersModel } from "../servidor-local/src/models/users.model.js";
import type { OrcamentoDBType } from "../servidor-local/src/utils/types.js";

export const BudgetResolver = {
    Query: {
        getAllBudgets: async () => {
            return await budgetModel.getAll();
        },
        getBudgetById: async (_: any, args: { id: string }) => {
            return await budgetModel.get(args.id);
        }
    },
    Mutation: {
        createBudget: async (_: any, args: { newUser: OrcamentoDBType }) => {
            return await budgetModel.create(args.newUser);
        },
        updateBudget: async (_: any, args: { id: string, newUser: OrcamentoDBType }) => {
            return await budgetModel.update(args.id, args.newUser);
        },
        deleteBudget: async (_: any, args: { id: string }) => {
            return await budgetModel.delete(args.id);
        }
    },
    // Relacionamentos de tabelas
    budget: {
        serviceProv: async (parent: { id: string }) => {
            return await PrestacaoServicoModel.get(parent.id);
        },
        user: async (parent: { id: string }) => {
            return await UsersModel.get(parent.id);
        }
    }
}