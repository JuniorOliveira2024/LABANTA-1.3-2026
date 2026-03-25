import express from "express";
import type { Response } from "express";

const app = express();

interface AlunosType {
    nome: string;
    endereco: string;
    contato?: string | null;
}

const alunos: Array<AlunosType> = [
    {
        nome: "Tiago",
        endereco: "Rua A",
        contato: "123456789"
    },
];

let horasTrabalhadas: number = 10;
let precoHora: number = 10;
let taxaUrgencia: number = 10;
let desconto: number = 10;

let variavel: string = "variavel";
desconto === taxaUrgencia && desconto > taxaUrgencia
    ? (taxaUrgencia += desconto)
    : (taxaUrgencia -= desconto);

function calcularTotal() {
    let total: number = 10;
    total = horasTrabalhadas * precoHora + taxaUrgencia - desconto;
    return total;
}
function meuNome(nome: string) {
    return "Ola " + nome;
}

function orcamento(precoHora: number, horasTrabalhadas: number, taxaUrgencia: number, desconto: number) {
    let total: number = 0;
    total = horasTrabalhadas * precoHora + taxaUrgencia - desconto;
    return total;
}

const aEnviar = orcamento(15, 19, 10, 5);
const nome = meuNome("Tiago");

console.log(nome); // Ola Tiago
console.log(aEnviar); // 290

const valorAReceber = calcularTotal();
console.log("valor a receber: ", valorAReceber);

app.get("/hello", (req, res) => {
    console.log("Hello World");
    res.send("Hello World");
});

app.listen(8080, () => {
    console.log("Server running on port 8080");
});

interface PedidoServico {
    cliente: string;
    descricao: string;
    horasEstimadas: number;
    urgente: boolean;
}

const pedodoServico: PedidoServico = {
    cliente: "Tiago",
    descricao: "Serviço de TI",
    horasEstimadas: 10,
    urgente: true
};

const existeCantina: boolean = true;
const cantinaTemCafe = false;
const existeEscComCAfe = true;

if (!existeCantina) {
    if (cantinaTemCafe) {
        console.log("toma cafe");
    } else {
        console.log("traze cantina nha cafe ");
    }
} else if (existeEscComCAfe) {
    console.log("toma cafe");
}

// declarações mínimas para não dar "Cannot find name ..."
const prestador_servico = { ativo: true };
let servico = { valido: true };
const idade = 18;

// seus serviços A/B/C (antes estavam como { servioA } etc e não existiam)
const servicoA = { nome: "A" };
const servicoB = { nome: "B" };
const servicoC = { nome: "C" };

function pedirOrcamento(res: Response) {
    if (!prestador_servico.ativo) {
        console.log("Prestador não está ativo");
        return res.status(400).send("prestador inativo");
    }

    if (!servico.valido) {
        return res.status(404).send("serico ka eh valido");
    }

    // aqui o tipo PedidoServico não tem "nome", tem "descricao"
    if (!pedodoServico.descricao) {
        console.log("descricao do servico eh obrigatorio");
        return res.status(400).send("descricao do servico eh obrigatorio");
    }

    if (idade >= 18) {
        console.log("pode beber");
    } else {
        console.log("nao pode beber");
    }

    // ciclos
    let iterador: number = 0;
    const pedidosServico = [servicoA, servicoB, servicoC];

    while (iterador < pedidosServico.length) {
        servico = { valido: true }; // só para manter a variável "servico" sendo usada
        iterador++;
    }

    iterador = 0;
    do {
        servico = { valido: true };
        iterador++;
    } while (iterador < pedidosServico.length);

    for (let i = 0; i < pedidosServico.length; i++) {
        servico = { valido: true };
    }
}

interface ServicoType {
    nome: string;
    precoHora: number;
}

let catalogoServicos: ServicoType[] = [];