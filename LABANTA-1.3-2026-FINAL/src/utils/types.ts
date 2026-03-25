
export interface PedidoServicoType {
    cliente: string;
    descricao: string;
    horasEstimadas: number;
    urgente: boolean;
}

export interface ResponseType {
    status: boolean,
    message: string,
    data: any | null,
}

export interface ServicoType {
    nome: string,
    precoHora: number
    categoria: string
    minimoDescontado: number
    percentagemDesconto?: number
}

export interface PrestadorType {
    id?: string;
    nif: number;
    nome: string;
    precoHora?: number;
    profissao: string;
    minimoParaDesconto?: number;
    percentagemDesconto?: number;
    taxaUrgencia?: number;
    taxa_urgencia: number;
    minimo_desconto: number;
    percentagem_desconto: number;
    disponivel: boolean;
    enabled: boolean;
    created_at?: string;
    updated_at?: string;
}

export interface UserType {
    id: string,
    nome: string,
    numero_identificacao: string,
    data_nascimento: string,
    email: string,
    telefone: string,
    pais: string,
    localidade: string,
    password: string,
    enabled: boolean,
    created_at: string,
    updated_at: string
}

export interface ServicoDBType {
    id: string,
    nome: string,
    desconto: string,
    categoria: string,
    enabled: boolean,
    created_at: string,
    update_at: string
}

export interface OrcamentoType {
    id?: number;
    total: number;
    id_utilizadores: string;
    enabled: boolean;
    created_at?: string;
    updated_at?: string;
}

export interface PrestacaoServicoType {
    id?: number;
    designacao: string;
    subtotal: number;
    horas_estimadas: number;
    id_prestador: string;
    id_servico: number;
    preco_hora: number;
    estado: 'pendente' | 'em_progresso' | 'finalizado' | 'cancelado';
    id_orcamento?: number;
    enabled: boolean;
    created_at?: string;
    updated_at?: string;
}

export interface PropostaType {
    id?: number;
    id_prestacao_servico: number;
    preco_hora: number;
    horas_estimadas: number;
    estado: 'pendente' | 'aceito' | 'recusado';
    enabled: boolean;
    created_at?: string;
    updated_at?: string;
}
