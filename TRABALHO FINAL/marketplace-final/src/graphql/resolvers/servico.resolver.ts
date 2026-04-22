import { ServiceModel } from "../../models/servico.modles.js";
import type { ServiceDBType } from "../../utils/types.js";

export const servicoResolver = {
    Query: {
        getAllServicos: async () => {
            return await ServiceModel.getAll();
        },
        getServicoById: async (_: any, args: { id: string }) => {
            return await ServiceModel.get(args.id);
        }
    },
    Mutation: {
        createServico: async (_: any, args: { servico: ServiceDBType }) => {
            return await ServiceModel.create(args.servico);
        },
        updateServico: async (_: any, args: { id: string, servico: ServiceDBType }) => {
            return await ServiceModel.update(args.id, args.servico);
        },
        deleteServico: async (_: any, args: { id: string }) => {
            return await ServiceModel.delete(args.id);
        }
    }
}
