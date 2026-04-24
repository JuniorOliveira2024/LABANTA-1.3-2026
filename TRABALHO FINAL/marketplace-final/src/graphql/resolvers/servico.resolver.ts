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
            createServico: async (_: any, args: { nome:string, descricao?:string, categoria?:string, enabled?:boolean }) => {
                const servico: ServiceDBType = {
            id:"",
            nome: args.nome,
            descricao: args.descricao || "",
            categoria: args.categoria || "",
            enabled: args.enabled ?? true,
            created_at: "",
            update_at:""
            }

                return await ServiceModel.create(servico);
            },
            updateServico: async (_: any, args: { id: string, servico: ServiceDBType }) => {
                return await ServiceModel.update(args.id, args.servico);
            },
            deleteServico: async (_: any, args: { id: string }) => {
                return await ServiceModel.delete(args.id);
            }
        }
    }
