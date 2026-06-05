<<<<<<< HEAD
import db from "./lib/db.js";
import { type ResponseType, type ServiceDBType, type ServicoType, } from "./utils/types.js";
export let catalogoServicos: ServicoType[] = []

// adicionar um serviço novo
export function adicionarServico(novoServico: ServicoType): ResponseType {
    if (!novoServico.nome || novoServico.precoHora <= 0) {
        return ({
            status: false,
            message: "Erro: Nome obrigatório e preço deve ser maior que zero.",
            data: null,
        });
    }

    for (let i = 0; i < catalogoServicos.length; i++) {
        if (catalogoServicos[i]?.nome === novoServico.nome) {
            return ({
                status: false,
                message: `Erro: O serviço '${novoServico.nome}' já existe.`,
                data: null,
            });
        }
    }

    catalogoServicos.push(novoServico);

    return ({
        status: true,
        message: "Sucesso: Serviço adicionado!",
        data: novoServico,
    });
}

// listar todos os serviços
export function listarServicos(): ServicoType[] {
    // TODO: implementar fetch de servicos

    return catalogoServicos
}

// apagar um servico 
export function apagarServico(nome: string): boolean {
    // TODO: implementar delete de servico

    const novoCatalogoTemp: ServicoType[] = []

    for (let i = 0; i < catalogoServicos.length; i++) {
        if (catalogoServicos[i]?.nome !== undefined && catalogoServicos[i]?.nome !== nome) {
            novoCatalogoTemp.push(catalogoServicos[i]!)
        }
    } // devolve um novo catalogo sem o servico que foi apagado

    catalogoServicos = novoCatalogoTemp

    return true
}

// obter um servico pelo nome
export function obterServico(nome: string): ServicoType | null {
    for (let i = 0; i < catalogoServicos.length; i++) {
        if (catalogoServicos[i]?.nome === nome) {
            return catalogoServicos[i]!
=======

import db from "./lib/db.js";
import type { NovoservicoType, ResponseType, Servicotype, } from "./util/types.js";

export let catalogoServico: Servicotype[] = [
    {
        nome: "Luis",
        precoHora: 50,
        minimiDesconto: 3,
        percentagemDesconto: 10,
        categoria: "Limpeza",
    },
];

// adicionar um serviço
export function adicionarServico(NovoServico: Servicotype) {
    // 1. Validação de Dados
    if (NovoServico.nome.trim() === "") {
        console.log("Erro: O nome do serviço não pode ser vazio.");
        return {
            success: false,
            message: "O nome do serviço não pode ser vazio.",
            data: "erro:o nome do serviço não pode ser vazio."
        }
    }
    if (NovoServico.precoHora <= 0) {
        console.log("Erro: O preço por hora deve ser um número positivo.");
        return {
            success: false,
            message: "O preço por hora deve ser um número positivo.",
            data: "erro:O preço por hora deve ser um número positivo."
        }
    }
    for (let i = 0; i < catalogoServico.length; i++) {
        if (catalogoServico[i]?.nome === NovoServico.nome) {
            console.log("Erro: O serviço já existe no catálogo.");
            return ({
                success: false,
                message: "O serviço já existe no catálogo.",
                data: "erro:O serviço já existe no catálogo."
            })
        }
    }
    // 3. Se passou por todos os "filtros" acima, adicionamos
    catalogoServico.push(NovoServico);
    return ({
        success: true,
        message: "Serviço adicionado com sucesso.",
        data: NovoServico
    })
}

// listar todos os servicos
export function listarservicos(): Servicotype[] {
    return catalogoServico;
}

// apagar um servico
export function apagarServico(nome: string): boolean {
    // todo: implementar fetch de servicos
    const novocatalogtempprario: Servicotype[] = []
    for (let i = 0; i < catalogoServico.length; i++) {
        if (catalogoServico[i]?.nome !== undefined && catalogoServico[i]?.nome !== nome) {

            novocatalogtempprario.push(catalogoServico[i]!)
        }
    } // Densemvolver um novo catalogo sem o serviço ser apagado
    catalogoServico = novocatalogtempprario
    return true
}

// obter um serviço por nome
export function obterServico(nome: string): Servicotype | null {

    for (let i = 0; i < catalogoServico.length; i++) {
        if (catalogoServico[i]?.nome === nome) {
            return catalogoServico[i]!
>>>>>>> 6882c7ff9db5db1972ef090b735c7803d73f7f73
        }
    }
    return null
}


<<<<<<< HEAD

export async function getServicos() {
    const [rows] = await db.execute("SELECT * FROM tbl_servicos");
    return rows;
}

export async function getServicosById(id: string) {
    const [rows] = await db.execute(
        "SELECT * FROM tbl_servicos WHERE id = ?",
        [id]
    );

    if (Array.isArray(rows) && rows.length === 0) return null

    return Array.isArray(rows) ? rows[0] : null;
}
export async function createServicos(
    id: string,
    nome: string,
    descricao: string,
    categoria: string,
    enabled: boolean
) {
    try {

        const [rows] = await db.execute(
            `INSERT INTO tbl_servicos
            (id, nome, descricao, categoria, enabled_at, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                null,
                nome,
                descricao,
                categoria,
                enabled,
                new Date(),
                new Date()
            ]
        );

        console.log({ rows });

        return rows;

=======
// funcao para adicionar novo servico no bd !*
export async function novoServico(NovoServico: NovoservicoType) {
    try {
        const row = await db.execute(`INSERT INTO tabela_servicos Values (?,?,?,?,?,?,?)`,
            [
                null,
                NovoServico.nome,
                NovoServico.descricao,
                NovoServico.categoria,
                NovoServico.enabled,
                NovoServico.created_at,
                NovoServico.updated_at
            ])
        if (!row) return null
        return row
>>>>>>> 6882c7ff9db5db1972ef090b735c7803d73f7f73
    } catch (error) {
        console.log({ "error": error })
        return null
    }
}

<<<<<<< HEAD
// Funcao para listar servico

export async function listaServicos() {
    try {

        const [rows] = await db.execute(
            "SELECT * FROM tbl_servicos"
        );

        return rows;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function addServiceToDB(newService: ServiceDBType) {
    console.log({ newService })

    try {

        const query = `INSERT INTO tbl_servicos VALUES (?, ?, ?, ?, ?, ?, ?)`

        const values = [
            null,
            newService.nome,
            newService.descricao,
            newService.categoria,
            newService.enabled_at,
            new Date(),
            new Date()
        ]
        const rows = await db.execute(query, values)

        return rows
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getServiceById(id: string) {
    try {

        const query = `SELECT * FROM tbl_servicos WHERE id = ?`

        const value = [id]

        const rows = await db.execute(query, value)

        return Array.isArray(rows) && rows.length > 0 ? rows[0] : null


    } catch (error) {
        console.log(error);
        return null
    }
}

export async function getAllService() {
    try {

        const query = `SELECT * FROM tbl_servicos`

        const rows = await db.execute(query)

        return Array.isArray(rows) && rows.length > 0 ? rows[0] : []

    } catch (error) {
        console.log(error);
        return null
    }
}

//update de dados
export async function updateService(id: string, updatedService: ServiceDBType) {
    try {
        const query = `UPDATE tbl_servicos
        SET
        nome=?,
        descricao=?,
        categoria=?,
        enabled_at=?,
        updated_at=?
        WHERE
        id=?
        `;

        const values = [
            updatedService.nome,
            updatedService.descricao,
            updatedService.categoria,
            updatedService.enabled_at,
            new Date(),
            id
        ]
        const rows = await db.execute(query, values)

        return rows
    } catch (error) {
        console.log(error);
=======
// funcao para selecionar todos os servicos no bd !
export async function listarServicos() {
    try {
        const servico = await db.execute(`SELECT * FROM tabela_servicos`)
        return servico[0]
    } catch (error) {
        console.log({ "error": error })
        return null
    }
}

// funcao para obter servicos no bd por id !
export async function getservicoById(id: string) {
    try {
        const [rows] = await db.execute(
            "SELECT * FROM tabela_servicos WHERE tabela_servicos.id = ?", [id])

        if (Array.isArray(rows) && rows.length === 0)
            return null

        return Array.isArray(rows) ? rows[0] : null
    } catch (error) {
        console.log({ "eror": error })
    }
}

//update dados servico
export async function updateservico(id: string, updatedservice: NovoservicoType) {
    try {
        const query = "UPDATE tabela_servicos SET nome=?, descricao=?, categoria=?, enabled=?, updated=?  WHERE id=?;"

        const values = [
            updatedservice.nome,
            updatedservice.descricao,
            updatedservice.categoria,
            new Date(),
            id]
        const rows = await db.execute(query, values)
        return rows
    } catch (error) {
        console.log(error)
>>>>>>> 6882c7ff9db5db1972ef090b735c7803d73f7f73
        return null
    }
}

// funcao para deletar servico
export async function deleteService(id: string) {
    try {
<<<<<<< HEAD

        const query = `DELETE  FROM tbl_servicos WHERE id = ?`

        const value = [id]

        const rows: any = await db.execute(query, value)

        return rows [0]?.affetedRows === 0 ? null : rows

    } catch (error) {
        console.log(error);
=======
        const query = "DELETE FROM tabela_servicos WHERE id =?"
        const value = [id]
        const rows = await db.execute(query, value)
        return rows
    } catch (error) {
        console.log(error)
>>>>>>> 6882c7ff9db5db1972ef090b735c7803d73f7f73
        return null
    }
}


