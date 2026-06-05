import { PrestacaoServicoModel } from "../../../../_trash/prestacao_servico.model.js";
import type { PrestacaoServicoDBType } from "../../utils/types.js";

export const userResolver = {
    Query: {
        getAllPrestacaoServico: async () => {
            return await PrestacaoServicoModel.getAll();
        },

        getPrestacaoServicoById: async (_: any, args: { id: string }) => {
            return await PrestacaoServicoModel.get(args.id);
        },

        getByIdOrcamento: async (_: any, args: { idOrcamento: string }) => {
            return await PrestacaoServicoModel.getByIdOrcamento(args.idOrcamento);
        },


    },

    Mutation: {
        createPrestacaoServico: async (_: any, args: { PrestacaoServico: PrestacaoServicoDBType }) => {
            return await PrestacaoServicoModel.create(args.PrestacaoServico);
        },

        updatePrestacaoServico: async (_: any, args: { id: string, PrestacaoServico: PrestacaoServicoDBType }) => {
            return await PrestacaoServicoModel.update(args.id, args.PrestacaoServico);
        },

        deletePrestacaoServico: async (_: any, args: { id: string }) => {
            return await PrestacaoServicoModel.delete(args.id);
        },


    }
}