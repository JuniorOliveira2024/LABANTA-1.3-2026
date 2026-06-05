<<<<<<< HEAD
import type { RowDataPacket } from "mysql2";
import db from "../lib/db.js";
import { getAllService, updateService } from "../servico.js";
import { type PrestacaoServicoDetalhadoType, type PrestacaoServicoDBType, type ServicoDBType, type ServicoDetalhadoType } from "../utils/types.js";
import { ca } from "date-fns/locale";
=======
import { id } from "date-fns/locale"
import db from "../lib/db.js"
import type { NovoservicoType, ServicoDetalhadoType } from "../util/types.js"
import type { deleteService } from "../servico.js"
import { formatDateDDMMYYYY } from "../util/date.js"
import type { RowDataPacket } from "mysql2"
>>>>>>> 6882c7ff9db5db1972ef090b735c7803d73f7f73


export const servicoModel = {
    //funcao para criar um novo servico
    async create(novoServico: NovoservicoType) {
        try {
            const [rows] = await db.execute<NovoservicoType & RowDataPacket[]>(`SELECT * FROM tabela_servicos ORDER BY id DESC LIMIT 1`,
                [
                    null,
                    novoServico.nome,
                    novoServico.descricao,
                    novoServico.categoria,
                    novoServico.enabled,
                    new Date(),
                    new Date()
                ])
            if (!rows) return null
            return rows as NovoservicoType
        } catch (error) {
<<<<<<< HEAD
            console.log(error);
            return null;
        }
    },


    async getAll(): Promise<ServicoDBType[] | null> {
        try {
            const query = `SELECT * FROM tabela_servicos`;

            const [rows] = await db.execute<ServicoDBType[] & RowDataPacket[]>(query);

            return Array.isArray(rows) ? rows : [];
        } catch (error) {
            console.log(error);
            return null;
        }
    },


    async get(id: string): Promise<ServicoDBType | null> {
        try {
            const query = `SELECT * FROM tabela_servicos WHERE id = ?`;

            const value = [id];

            const [rows] = await db.execute<ServicoDBType & RowDataPacket[]>(query, value);
            return Array.isArray(rows) && rows.length > 0 ? rows[0] as ServicoDBType : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async getByIdOrcamento(idOrcamento: string): Promise<PrestacaoServicoDBType | null> {
        try {
            const [rows] = await db.execute<PrestacaoServicoDBType[] & RowDataPacket[]>(`
                SELECT * FROM tbl_prestacao_servico
                WHERE tbl_prestacao_servico.id_orcamento = ?
                `, [idOrcamento])

            if (Array.isArray(rows) && rows.length === 0) return null

            return Array.isArray(rows) ? rows[0] as PrestacaoServicoDBType : null

        } catch (error) {
            console.log(error);
=======
            console.log({ "error": error })
>>>>>>> 6882c7ff9db5db1972ef090b735c7803d73f7f73
            return null
        }
    },

    // funcao para obter todos os servicos
    async getAll(): Promise<NovoservicoType | null> {
        try {
            const [rows] = await db.execute<NovoservicoType & RowDataPacket[]>("SELECT * FROM tabela_servicos")
            return rows as NovoservicoType
        } catch (error) {
            console.log({ "error": error })
            return null
        }
    },

    //funcao para obter um servico por id
    async get(id: string): Promise<NovoservicoType | null> {
        try {
            const [rows] = await db.execute<NovoservicoType & RowDataPacket[]>(
                "SELECT * FROM tabela_servicos WHERE tabela_servicos.id = ?", [id])

            if (rows.length > 0) {
                return rows[0] as NovoservicoType
            }

        } catch (error) {
            console.log({ "eror": error })
        }
        return null
    },

    //funcao para atualizar servico
    async update(id: string, servicoAtualizado: NovoservicoType): Promise<NovoservicoType | null> {
        try {
            const query = "UPDATE tabela_servicos SET nome=?, descricao=?, categoria=?, enabled=?, updated_at=?  WHERE id=?;"

            const values = [
                servicoAtualizado.nome,
                servicoAtualizado.descricao,
                servicoAtualizado.categoria,
                servicoAtualizado.enabled,
                formatDateDDMMYYYY(servicoAtualizado.updated_at),
                id]
            const [rows] = await db.execute<NovoservicoType & RowDataPacket[]>(query, values)
            return rows as NovoservicoType
        } catch (error) {
            console.log(error)
            return null
        }
    },

    // funcao para apagar
    async deleteService(id: string): Promise<NovoservicoType | null> {
        try {
            const query = "DELETE FROM tabela_servicos WHERE id =?"
            const value = [id]

            const [rows] = await db.execute<NovoservicoType & RowDataPacket[]>(query, value)
            return rows as NovoservicoType

        } catch (error) {
            console.log(error)
            return null
        }

    },

    //funcao para obter todos os servicos detalhados
    async getAllServicoDetalhada(limit: number, offset: number): Promise<ServicoDetalhadoType[] | null> {
        try {
            const query = `SELECT DISTINCT
            s.id as id_servico,
            s.nome as nome_servico,
            s.descricao as servico_descricao ,
            c.disignacao as disignacao_categoria,
            c.icone as icone_categoria,
            e.id as id_empresa,
            e.disignacao as disignacao_empresa,
            e.icone as icone_empresa,
            s.enabled
        FROM tabela_servicos s
        INNER JOIN tabela_categoria c ON c.id = s.id_categoria
        INNER JOIN tabela_prestacao_servico ps ON s.id = ps.id_servico
        INNER JOIN tabela_empresa e ON e.id = ps.id_empresa
        LIMIT ? OFFSET ?` ;


            const values = [
                limit.toString(),
                offset.toString()
            ]

            const [rows] = await db.execute<ServicoDetalhadoType[] & RowDataPacket[]>(query, values)

            return Array.isArray(rows) && rows.length > 0 ? rows as ServicoDetalhadoType[] : []
        } catch (error) {
            console.log(error)
            console.log("erro a buscar servicos detalhados")
            return []
        }
    }
}
