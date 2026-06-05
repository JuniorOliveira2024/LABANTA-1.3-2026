import { budgetModel } from "../../models/orcamentos.model.js";
import { PrestacaoServicoModel } from "../../models/prestacao-servico.model.js";
import { ServiceModel } from "../../models/servico.model.js";
import { PrestadorDBType } from "../../utils/types.js";

export const ServiceProvResolver = {
    Query: {
        getAllServiceProv: async () => {
            return await PrestacaoServicoModel.getAll();
        },
        getServiceProvById: async (_: any, args: { id: string }) => {
            return await PrestacaoServicoModel.get(args.id);
        }
    },
    Mutation: {
        createServiceProv: async (_: any, args: { serviceProv: PrestadorDBType }) => {
            return await PrestacaoServicoModel.create(args.serviceProv);
        },
        updateServiceProv: async (_: any, args: { id: string, newServiceProv: PrestadorDBType }) => {
            return await PrestacaoServicoModel.update(args.id, args.newServiceProv);
        },
        deleteServiceProv: async (_: any, args: { id: string }) => {
            return await PrestacaoServicoModel.delete(args.id);
        }
    },
    // Relacionamentos de tabelas
    serviceProv: {
        servico: async (parent: { id: string }) => {
            return await ServiceModel.get(parent.id);
        },
        budget: async (parent: { id: string }) => {
            return await budgetModel.get(parent.id);
        },
        prestador: async (parent: { id: string }) => {
            return await PrestadorModel.get(parent.id);
        },
        proposta: async (parent: { id: string }) => {
            return await PropostaModel.get(parent.id);
        }
    }
}