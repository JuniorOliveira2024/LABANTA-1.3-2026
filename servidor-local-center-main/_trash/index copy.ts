import express, { type Request, type Response } from "express";
<<<<<<< HEAD
import {
    adicionarServico,
    apagarServico,
    listarServicos,
    obterServico,
    getServiceById,
    addServiceToDB,
    getAllService,
    updateService,
    deleteService,

} from "./servico.js";
import {
    apagarPrestadorDeServico,
    calcularOrcamento,
    criarPrestadorDeServico,
    editarPrestadorDeServico,
    selecionarPrestador,
    selecionarServico,
} from "./orcamento.js";
import { createUser, getUserById, getUsers } from "./users.js";
import {
    createServicos,
    getServicosById,
    getServicos,
    listaServicos,
} from "./servico.js";
import { createPropostas, getPropostasById, getPropostas } from "./proposta.js";
import { stat } from "node:fs";
import type { ServiceDBType } from "./utils/types.js";
import { generateUUID } from "./utils/uuid.js";
const app = express();
app.use(express.json());

app.get("/hello", (req: Request, res: Response) => {
    console.log("Hello World");
    res.send("Hello World");
=======
import { adicionarServico, apagarServico, listarServicos, novoServico, obterServico } from "./servico.js";
import { apagarPrestadorDeServico, calcularOrcamento, criarPrestadorDeServicos, editarPrestadorDeServico, obterPrestadorDeServico, selecionarPrestadorDeServico, SelecionarServicos } from "./orcamento.js";
import { getAllPrestadores, getPrestadorById, novoPrestador, updatePrestador } from "./prestador.js";
import type { NovoprestadorType, NovoservicoType, prestadorType, utilizadorType } from "./util/types.js";
import { getservicoById, updateservico, } from "./servico.js";
import { start } from "node:repl";
import { deleteuser, getUser, getUserById, novoUtilizador, updateuser } from "./user.js";


const app = express(); // cria a aplicação
app.use(express.json()); // para interpretar o corpo das requisições como JSON

// rota inicial
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// rota para adicionar um serviço novo
app.post("/adicionar-servico", (req: Request, res: Response) => {
    const novoServico = req.body

// rota para adicionar um serviço
app.post("/adicionar-servico", (req: Request, res: Response) => {
    const novoServico = req.body;
    console.log(novoServico);
    const addServico = adicionarServico(novoServico);
    res.json(addServico);
>>>>>>> 6882c7ff9db5db1972ef090b735c7803d73f7f73
});

//rota para adicionar um novo serviço
app.post("/adicionar-servico", (req: Request, res: Response) => {
    const novoServico = req.body;

<<<<<<< HEAD
    console.log(novoServico);
    const addServicoResponse = adicionarServico(novoServico);
    res.json(addServicoResponse);
});

//rota para listar todos os serviços
app.get("/listar-servicos", (req: Request, res: Response) => {
    const listservicosResponse = listarServicos();
    res.json(listservicosResponse);
});

//rota para apagar um serviço
app.delete("/apagar-servico", (req: Request, res: Response) => {
    const { nome } = req.query;

    if (nome) {
        const apagarServicoResponse = apagarServico(nome as string);

        res.json(apagarServicoResponse);
    } else {
        res.json({
            mensagem: "Nome do serviço é obrigatório.",
        });
    }
});

//rota para obte serviço específico pelo nome
app.get("/obter-servico", (req: Request, res: Response) => {
    const { nome } = req.query;
    if (nome) {
        const obterServicoResponse = obterServico(nome as string);
        res.json(obterServicoResponse);
    } else {
        res.json({
            mensagem: "Nome do serviço é obrigatório.",
        });
    }
});

//rota para selecionar servico
app.post("/selecionar-servico", (req: Request, res: Response) => {
    const { nome } = req.body;
    const selecionarServicoResponse = selecionarServico(nome as string);
    res.json({ selecionarServicoResponse });
});

//rota para selecionar prestador de servico pelo nome
app.post("/selecionar-prestador", (req: Request, res: Response) => {
    const { nome } = req.body;
    const selecionarPrestadorResponse = selecionarPrestador(nome as string);
    res.json({
        status: selecionarPrestadorResponse,
        message: "Prestador selecionado com sucesso!",
    });
});

//Rota para criar prestador de serviço
app.post("/criar-prestador", (req: Request, res: Response) => {
    const novoPrestador = req.body;
    const criarPrestadorResponse = criarPrestadorDeServico(novoPrestador);
    res.json(criarPrestadorResponse);
});

//Rota para editar prestador de serviço
app.put("/editar-prestador", (req: Request, res: Response) => {
    const { nomePrestador, novosDadosDoPrestador } = req.body;
    const editarPrestadorResponse = editarPrestadorDeServico(
        nomePrestador as string,
        novosDadosDoPrestador,
    );
    res.json(editarPrestadorResponse);
});

//Rota para apagar prestador de serviço
app.delete("/apagar-prestador", (req: Request, res: Response) => {
    const { nomePrestador } = req.query;
    const apagarPrestadorResponse = apagarPrestadorDeServico(
        nomePrestador as string,
    );
    res.json(apagarPrestadorResponse);
});

//rota para calcular orçamento
app.post("/calcular-orcamento", (req: Request, res: Response) => {
    const { pedido } = req.body;
    const calcularOrcamentoResponse = calcularOrcamento(pedido);
    res.json({
        message: "Orcamento calculado com sucesso!",
        orcamentoTotal: calcularOrcamentoResponse,
    });
});

//selecionar todos os utilizadores presentes na base de dados
app.get("/get-users", async (req: Request, res: Response) => {
    const getUsersResponse = await getUsers();
    res.json(getUsersResponse);
});

// selecionar um utilizador específico pelo id
app.get("/get-user-id", async (req: Request, res: Response) => {
    const { id } = req.query;
    if (id) {
        const getUserByIdResponse = await getUserById(id as string);

        if (!getUserByIdResponse) {
            res.status(404).json({
                status: "error",
                message: "Utilizador nao encontrado",
                data: null,
            });
        }

        res.status(200).json({
            status: "success",
            message: " Utilizador encontrado com sucesso!",
            data: getUserByIdResponse,
        });

        res.json(getUserByIdResponse);
    } else {
        res.json({
            mensagem: "ID do utilizador é obrigatório.",
        });
=======
// rota para listar todos os serviços
app.get("/listall", (req: Request, res: Response) => {
    const listenerServicoResponse = listarServicos();
    res.json({ listarServicosResponse: listarServicos() });
});


// rota para apagar um serviço 
app.delete("/apagar-servico", (req: Request, res: Response) => {
    const { nome } = req.query
    if (nome) {
        const apagarServicoResponse = apagarServico(nome as string);
        res.json({ apagarServicoResponse })
    } else
        message: "nome do servico não encontrado"
});


// rota para obter servico pelo nome
app.get("/obter-servico", (req: Request, res: Response) => {
    const { nome } = req.query
    if (nome) {
        const obterServicoResponse = obterServico(nome as string)
        res.json(obterServicoResponse)
    } else {
        { message: "nome do servico é obrigatório" }
    }
});


// rota para selecionar servico
app.post("/selecionar-servico", (req: Request, res: Response) => {
    const { nome } = req.body;

    const selecionarServicoResponse = SelecionarServicos(nome as string);
    res.json({ selecionarServicoResponse })
});


// rota para calcular orcamento
app.post("/calcular-orcamento", (req: Request, res: Response) => {
    const { pedido } = req.body

    const calcularOrcamentoresponse = calcularOrcamento(pedido)

    res.json(calcularOrcamentoresponse)
});

//rota para listar todos os prestadores de servico
app.get("/listar-prestadores", (req: Request, res: Response) => {
    const listPrestadoresServicoResponse = listarPrestadoresServicos()

// rota para selecionar prestadores
app.post("/selecionar-prestador", (req: Request, res: Response) => {
    const { nomeDoPrestador } = req.body

    const selecionarPrestadorDeServicoresponse = criarPrestadorDeServicos(nomeDoPrestador);

    res.json({
        status:
            selecionarPrestadorDeServicoresponse,
        message: "prestador de servico selecionado com sucesso"
    })
});


//rota para criar prestador 
app.post("/criar-prestador", (req: Request, res: Response) => {
    // pegar o corpo de requisicao com os dados do novo prestador
    const novoPrestador = req.body
    const criarPrestadorResponse = criarPrestadorDeServicos(novoPrestador)
    res.json(criarPrestadorResponse)
});


// rota para editar prestador de servico
app.get("/editar-prestador", (req: Request, res: Response) => {
    const { nomeDoPrestador, novoDadosDoPrestador } = req.body
    const editarPrestadorResponse = editarPrestadorDeServico(nomeDoPrestador as string, novoDadosDoPrestador);
    res.json(editarPrestadorResponse)
})

//rota para apagar prestador de servico
app.delete("/apagar-prestador-servico", (req: Request, res: Response) => {
    const { nomePrestador } = req.query
    const apagarPrestadorResponse = apagarPrestadorDeServico(nomePrestador as string);
    res.json({ apagarPrestadorResponse })
}
);

// rota para obter prestador de servico
app.get("/obter-prestador-servico", (req: Request, res: Response) => {
    const { nome } = req.query
    if (nome) {
        const obterPrestadorDeServicoResonse = obterPrestadorDeServico(nome as string);
        res.json({ obterPrestadorDeServicoResonse })
    }
});


// selecionar todos os utilizadores na base de dados
app.get("//get-users", async (req: Request, res: Response) => {
    const getUserResponse = await getUser()
    res.json(getUserResponse)
});

// selecionar um utilizador por id
app.get("/get-user-by-id", async (req: Request, res: Response) => {
    const { id } = req.query

    if (id) {
        const getUserByIdResponse = await getUserById(id as string)
        if (!getUserByIdResponse) {
            res.status(404).json({
                status: "error",
                message: "utilizador nao encontrado",
                data: null
            })
        }

        res.status(200).json({
            status: "success",
            message: "utilizador encontrado",
            data: getUserByIdResponse
        })
    }
});


// Inserir um novo utilizador
app.post("/novo-utilizador", async (req: Request, res: Response) => {
    const utilizador = req.body as utilizadorType

    console.log({ " utilizador index.ts": utilizador })
    const novoUtilizadorResponse = await novoUtilizador(utilizador)
    res.json(novoUtilizadorResponse)

});

// rota para inserir novo servico
app.post("/introduzir-servico", async (req: Request, res: Response) => {
    const NovoServico = req.body as NovoservicoType
    console.log({ "servico": NovoServico })

    const novoServicoResponse = await novoServico(NovoServico)
    res.json({
        status: novoServicoResponse,
        message: "servico adicionado com sucesso"
    })
});

// rota para inserir novo prestador
app.post("/novo-prestador", async (req: Request, res: Response) => {
    const Novoprestador = req.body as NovoprestadorType
    console.log({ "prestador adicionado com sucesso": Novoprestador })

    const novoprestadorResponse = await novoPrestador(Novoprestador)
    res.json(novoprestadorResponse)
});

//rota para selecionar servicos no bd
app.get("/list-service", async (req: Request, res: Response) => {
    const servico = await listarServicos()
    res.json({ listarservicosResponse: servico });
});


// rota para selecionar servicos por id no bd
app.get("/list-service-id", async (req: Request, res: Response) => {
    const { id } = req.body

    const selecionarservicoresponse = await getservicoById(id)
    res.json({
        status:
            selecionarservicoresponse,
        message: "servico selecionado com sucesso"
    })
});


//rota para fazer updated de servico
app.get("/updated-service-by-id/:id", async (req: Request, res: Response) => {
    const { id } = req.params
    const updatedService: NovoservicoType = req.body

    if (!id) {
        return res.status(400).json({
            status: "erro",
            message: "id obrigatorio",
            data: null
        })
>>>>>>> 6882c7ff9db5db1972ef090b735c7803d73f7f73
    }
});

<<<<<<< HEAD
//rota para criar utilizador
app.post("/create-user", async (req: Request, res: Response) => {
    const user = req.body;

    if (!user) {
        return res.status(400).json({
            status: "error",
            mensagem: "Campos obrigatórios em falta",
            data: null,
        });
    }

    console.log("Dados recebidos:", user);

    const insertUserResponse = await createUser(
        user.id,
        user.nome,
        user.numero_identidade,
        user.data_nascimento,
        user.email,
        user.password,
        user.telefone,
        user.pais,
        user.localidade,
        user.enebled,
        user.created_at,
        user.updated_at,
    );

    res.json(insertUserResponse);
});

//Rota para criar um novo serviço na base de dados
app.post("/create-servico", async (req: Request, res: Response) => {
    const servico = req.body;

    if (!servico) {
        return res.status(400).json({
            status: "error",
            mensagem: "Campos obrigatórios em falta",
            data: null,
        });
    }

    console.log("Dados recebidos:", servico);

    const insertServicoResponse = await createServicos(
        servico.id,
        servico.nome,
        servico.descricao,
        servico.categoria,
        servico.enabled,
    );

    res.json(insertServicoResponse);
});

// Listar todos os serviços
app.get("/get-servicos", async (req: Request, res: Response) => {
    const servicos = await getServicos();
    res.json({
        status: "success",
        message: "Serviços encontrados com sucesso!",
        data: servicos,
    });
});

// Buscar serviço por ID
app.get("/get-servico-id", async (req: Request, res: Response) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({
            status: "error",
            message: "ID do serviço é obrigatório",
            data: null,
        });
    }

    const servico = await getServicosById(id as string);

    if (!servico) {
        return res.status(404).json({
            status: "error",
            message: "Serviço não encontrado",
            data: null,
        });
    }

    res.json({
        status: "success",
        message: "Serviço encontrado com sucesso!",
        data: servico,
    });
});

// Rota para listar servicos
app.get("/lista-servicos", async (req: Request, res: Response) => {
    const servicos = await listaServicos();

    res.json({
        status: "success",
        message: "Serviços encontrados com sucesso!",
        data: servicos,
    });
});

//Rota para criar uma nova proposta na base de dados
app.post("/create-proposta", async (req: Request, res: Response) => {
    const proposta = req.body;

    if (!proposta) {
        return res.status(400).json({
            status: "error",
            mensagem: "Campos obrigatórios em falta",
            data: null,
        });
    }

    console.log("Dados recebidos:", proposta);

    const insertPropostaResponse = await createPropostas(
        proposta.id,
        proposta.id_prestacao_servico,
        proposta.preco_hora,
        proposta.horas_estimadas,
        proposta.estado,
        proposta.enabled,
    );

    res.json(insertPropostaResponse);
});

// Listar todos as propostas
app.get("/get-propostas", async (req: Request, res: Response) => {
    const propostas = await getPropostas();

    res.json({
        status: "success",
        message: "propostas encontrados com sucesso!",
        data: propostas,
    });
});

// Buscar proposta por ID
app.get("/get-proposta-id", async (req: Request, res: Response) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({
            status: "error",
            message: "ID da proposta é obrigatório",
            data: null,
        });
    }

    const proposta = await getPropostasById(id as string);

    if (!proposta) {
        return res.status(404).json({
            status: "error",
            message: "proposta não encontrado",
            data: null,
        });
    }

    res.json({
        status: "success",
        message: "proposta encontrado com sucesso!",
        data: proposta,
    });
});

app.post("/create-servico", async (req: Request, res: Response) => {
    const newService: ServiceDBType = req.body;

    if (!newService) {
        return res.status(400).json({
            status: "error",
            message: "Dados de sevico invalidos",
            data: null,
        });
    }
    console.log(newService);

    const createServiceResponse = await addServiceToDB(newService);

    if (!createServiceResponse === null) {
        return res.status(400).json({
            status: "error",
            message: "Erro ao criar servico",
            data: null,
        });
    }

    res.status(200).json({
        status: "sucess",
        message: "servico criado com sucesso",
        data: createServiceResponse,
    });
});

app.get("/get-service-by-id", async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({
            status: "error",
            message: "ID obrigatorio",
            data: null,
        });
=======
    if (!updatedService) {
        return res.status(500).json({
            status: "erro",
            message: "dados de servico invalido",
            data: null
        })
    }
    const updatedServiceResponse = await updateservico(id as string, updatedService)

    if (!updatedServiceResponse) {
        return res.status(400).json({
            status: "erro",
            message: "erro ao atualizar servico",
            data: null
        })
    }

    return res.status(200).json({
        status: "sucess",
        message: "servico atualizado com sucesso",
        data: null
    })
});


// rota para deletar servico
app.delete("delete-service-by-id/:id", async (req: Request, res: Response) => {
    const { id } = req.params

    if (id) {
        return res.status(400).json({
            status: "erro",
            message: "id obrigatorio",
            data: null
        })
    }

    const apagarServicoResponse = await apagarServico(id as string)
    if (!apagarServicoResponse) {
        return res.status(500).json({
            status: "erro",
            message: "erro ao apagar este servico",
            data: null
        })
    }
    return res.status(200)
});


// rota par fazer update de users !*
app.get("/updated-user-by-id/:id", async (req: Request, res: Response) => {
    const { id } = req.params
    const updatedUser: utilizadorType = req.body

    if (!id) {
        return res.status(400).json({
            status: "erro",
            message: "id obrigatorio",
            data: null
        })
>>>>>>> 6882c7ff9db5db1972ef090b735c7803d73f7f73
    }
    const getServiceByIdResponse = await getServiceById(id as string);

<<<<<<< HEAD
 if (!getServiceByIdResponse) {
        return res.status(404).json({
            status: "error",
            message: "servico não encontrado",
            data: null,
        });
    }

    res.status(200).json({
        status: "sucess",
        message: "servico encontrado com sucesso",
        data: getServiceByIdResponse
    });

})


app.get("/get-all-services", async (req: Request, res: Response) => {
    const getAllServiceResponse = await getAllService();

    if (!getAllServiceResponse) {
        return res.status(400).json({
            status: "error",
            message: "Erro ao selecionar servicos",
            data: null,
        });
    }

    res.status(200).json({
        status: "sucess",
        message: "servico encontrado",
        data: getAllServiceResponse
    });

})

app.put("/update-service-by-id/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

const updatedService: ServiceDBType = req.body

if (!id) {
        return res.status(400).json({
            status: "error",
            message: "ID é obrigatório",
            data: null,
        });
    }

    if (!updatedService) {
        return res.status(400).json({
            status: "error",
            message: "Dados de servico invalido",
            data: null,
        });
    }

    const updateServiceResponse = await updateService (id as string, updatedService)

    if (!updateServiceResponse) {
        return res.status(400).json({
            status: "error",
            message: "Erro ao atualizar servico",
            data: null,
        });
    }

    return  res.status(200).json({
        status: "sucess",
        message: "servico atualizado com sucesso",
        data: updateServiceResponse
    });
})


app.delete("/delete-service-by-id/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

if (!id) {
        return res.status(400).json({
            status: "error",
            message: "ID  obrigatório",
            data: null,
        });
    }

    const deleteServiceResponse = await deleteService (id as string)

    if (!deleteServiceResponse) {
=======
    if (!updatedUser) {
>>>>>>> 6882c7ff9db5db1972ef090b735c7803d73f7f73
        return res.status(400).json({
            status: "erro",
            message: "dados de user invalido",
            data: null
        })
    }
    const updatedUserResponse = await updateuser(id as string, updatedUser)

    if (!updatedUserResponse) {
        return res.status(400).json({
            status: "erro",
            message: "erro ao atualizar user",
            data: null
        })
    }

<<<<<<< HEAD
        return res.status(200).json({
            status: "sucess",
            message: "Servico apagado com sucesso",
            data: deleteServiceResponse
        });
    })
=======
    return res.status(400).json({
        status: "sucess",
        message: "user atualizado com sucesso",
        data: null
    })
});

// rota para deletar user !*
app.delete("delete-user-by-id/:id", async (req: Request, res: Response) => {
    const { id } = req.params

    if (id) {
        return res.status(400).json({
            status: "erro",
            message: "id obrigatorio",
            data: null
        })
    }

    const apagarUserResponse = await deleteuser(id as string)
    if (!apagarUserResponse) {
        return res.status(500).json({
            status: "erro",
            message: "erro ao apagar este user",
            data: null
        })
    }
    return res.status(200)
});

// rota para adicionar prestador no bd
app.post("/novo-prestador", async (req: Request, res: Response) => {
    const Novoprestador = req.body as NovoprestadorType
    console.log({ "prestador adicionado com sucesso": Novoprestador })

    const novoprestadorResponse = await novoPrestador(Novoprestador)
    res.json(novoprestadorResponse)
});

>>>>>>> 6882c7ff9db5db1972ef090b735c7803d73f7f73
























// inicia o servidor na porta 3000
app.listen(8080, () => {
<<<<<<< HEAD
    console.log("Servidor rodando na porta 8080");
=======
    console.log("Servidor rodando em http://localhost:8080");
>>>>>>> 6882c7ff9db5db1972ef090b735c7803d73f7f73
});
