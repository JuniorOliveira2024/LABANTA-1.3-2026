import { catalogoServicos } from "./servico.js"
import { type PedidoServicoType, type PrestadorType, type ServicoType, type ResponseType } from "./utils/types.js"


const taxaUrgencia: number = 0.3
const minimoParaDesconto: number = 100
const percentagemDesconto: number = 0.1

const servicosSelecionados: ServicoType[] = []
const prestadoresDeServico: PrestadorType[] = []
const prestadoresSelecionados: PrestadorType[] = []

// funcao para selecionar servicos e horasEstimadas
export function selecionarServicos(nome: string) {
    for (let i = 0; i < catalogoServicos.length; i++) {
        if (catalogoServicos[i]?.nome === nome) {
            servicosSelecionados.push(catalogoServicos[i]!)
            return true
        }
    }
    return false
}

// fucnao para criar prestadores de servico
export function criarPrestadoresDeServico(novoPrestador: PrestadorType) {
    // verificar se o prestador ja esta no array
    prestadoresDeServico.map((prestadorExistente: PrestadorType) => {
        if (prestadorExistente.nome === novoPrestador.nome) {
            // se o prestador ja existir, retorna uma mensagem de erro
            return {
                status: false,
                message: "Ja existe um prestador de servico com esse nome",
                data: null
            }
        }
    })

    // se o prestador nao existir, adicionamos o novo prestador
    prestadoresDeServico.push(novoPrestador)
    return {
        status: true,
        message: "Prestador de servico adicionado com sucesso",
        data: novoPrestador
    }
}

// funcao para calcular o orcamento
export function calcularOrcamento(pedido: PedidoServicoType) {
    let totalBruto: number = 0
    let totalFinal: number = 0

    servicosSelecionados.map((servico: ServicoType) => {
        let totalDoServico: number = servico.precoHora * pedido.horasEstimadas
        totalBruto = totalBruto + totalDoServico
    })

    totalFinal = totalBruto

    if (pedido.urgente) {
        totalFinal = totalBruto + (totalBruto * taxaUrgencia)
    }

    if (totalBruto >= minimoParaDesconto) {
        totalFinal = totalFinal - (totalBruto * percentagemDesconto)
    }

    return totalFinal

    // () => {} --- arrow function
    // function () {} --- function normal

    /* 
    
    urgente: true
    taxaUrgencia: 0.3
    totalBruto: 100
    totalTaxa: 100 * 0.3 = 30
    totalFinal: 100 + 30 = 130

    totalBruto: 100
    totalbruto apos urgencia: 150
    minimo descnto: 100
    percentagem: 10%
    desconto sobre total final: 150 * 0.1 = 15
    desconto sobre total bruto: 100 * 0.1 = 10

    */
}


//funcao para selecionar prestador pelo nome
export function selecionarPrestador(nome: string) {
    let prestadorExiste = false
    for (let i = 0; i < prestadoresDeServico.length; i++) {
        if (prestadoresDeServico[i]?.nome === nome) {
            prestadoresSelecionados.push(prestadoresDeServico[i]!)
            prestadorExiste = true
            break
        }
    }

    if (prestadorExiste) {
        return "O prestador foi selecionado"
    }else{
        return "o prestador não existe"
    }
}
//funcao para editar prestador de servico
export function editarPrestadorDeServico(nomeDoPrestador: string, novosDadosdoPrestador: PrestadorType){


    //ciclo que percorre a lista e verifica o nome do prestador de servico
    prestadoresDeServico.map((prestadorExistente: PrestadorType)=> {
        if (prestadorExistente.nome == nomeDoPrestador){
            prestadorExistente.nome = novosDadosdoPrestador.nome
            prestadorExistente.precoHora = novosDadosdoPrestador.precoHora
            prestadorExistente.profissao = novosDadosdoPrestador.profissao
            prestadorExistente.minimoParaDesconto =  novosDadosdoPrestador.minimoParaDesconto
            prestadorExistente.percentagemDesconto = novosDadosdoPrestador.percentagemDesconto
            prestadorExistente.taxaUrgencia = novosDadosdoPrestador.taxaUrgencia
        }
        return {
            status: true,
            message: "Prestador de servico editado com suceso",
            data: prestadorExistente
        }
    })
}


//prestadorDeServico.replace()
//funcao para apagar um prestador de servico
//ciclo para percorrer a lista de prestadores
//if para verificar se o nome do prestador for igual ao nome recebido 
//se encontrado remover o prestador
// retornar uma mensagem de sucesso
//se nao existir nenhum prestador com o nome recebido, retorna uma mensagem de prestador

//funcao para obter um prestador de servico pelo nome

// Função para apagar um prestador de serviço
export function apagarPrestador(nome: string): string {
    // Ciclo para percorrer a lista de prestadores
    for (let i = 0; i < listarPrestadores.length; i++) {
        const prestador = listarPrestadores[i];
        // If para verificar se o nome do prestador for igual ao nome recebido
        if (prestador && prestador.nome === nome) {
            // Se encontrado remover o prestador
            listarPrestadores.splice(i, 1);
            // Retornar uma mensagem de sucesso
            return `Sucesso: Prestador '${nome}' foi removido com sucesso.`;
        }
    }

    // Se não existir nenhum prestador com o nome recebido, retorna uma mensagem
    return `Erro: Não foi encontrado nenhum prestador com o nome '${nome}'.`;
}

// Função para obter um prestador de serviço pelo nome
export function obterPrestadorPorNome(nome: string): PrestadorType | string {
    for (let i = 0; i < listarPrestadores.length; i++) {
        const prestador = listarPrestadores[i];
        if (prestador && prestador.nome === nome) {
            return prestador;
        }
    }
    return `Erro: Prestador '${nome}' não encontrado.`;
}
