import express, { type Request, type Response } from "express"
import { adicionarServico, apagarServico, listarServicos, obterServico } from "./servico.js"
import { calcularOrcamento, criarPrestadoresDeServico, selecionarPrestador, selecionarServicos } from "./orcamento.js"
import { createUser, getUsers, getUsersById } from "./user.js"
import type { UserType } from "./utils/types.js"

const app = express()
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!")
})

// rota para adicionar um serviço novo
app.post("/adicionar-servico", (req: Request, res: Response) => {
  const novoServico = req.body

  const addServicoResponse = adicionarServico(novoServico)

  res.json(addServicoResponse)
})

// rota para listar todos os servicos
app.get("/listar-servicos", (req: Request, res: Response) => {
  const listServicoResponse = listarServicos()

  res.json(listServicoResponse)
})

// rota para apagar um servico
app.delete("/apagar-servico", (req: Request, res: Response) => {
  const { nome } = req.query

  if (nome) {
    const apagarServicoResponse = apagarServico(nome as string)

    res.json(apagarServicoResponse)
  } else {
    res.json({
      message: "Nome do servico eh obrigatorio"
    })
  }
})

// rota para obter servico pelo nome 
app.get("/obter-servico", (req: Request, res: Response) => {
  const { nome } = req.query

  if (nome) {
    const obterServicoResponse = obterServico(nome as string)

    res.json(obterServicoResponse)
  } else {
    res.json({
      message: "Nome do servico eh obrigatorio"
    })
  }
})

// rota para selecionar servicos
app.post("/selecionar-servico", (req: Request, res: Response) => {
  const { nome } = req.body

  const selecinarServicoResponse = selecionarServicos(nome as string)

  res.json(selecinarServicoResponse)
})

// Rota para listar todos os prestadores
// app.get("/listar-prestadores", (req: Request, res: Response) => {
//   const listPrestadoresResponse = listarPrestadores()
//   res.json(listPrestadoresResponse)
// })

// rota para calcular orcamento
app.post("/calcular-orcamento", (req: Request, res: Response) => {
  const { pedido } = req.body

  const calcularOrcamentoresponse = calcularOrcamento(pedido)

  res.json({
    message: "Orcamento calculado com sucesso",
    orcamentoTotal: calcularOrcamentoresponse
  })
})

//rota para criar prestador
app.post("/criar-prestador", (req: Request, res: Response) => {
  const novoPrestador = req.body

  const novoPrestadorResponse = criarPrestadoresDeServico(novoPrestador)

  res.json(novoPrestadorResponse)
})

//rota para selecionar prestadores
app.post("/selecionar-prestador", (req: Request, res: Response) => {
  const { nome } = req.query

  if (nome) {
    const selecionarPrestadorResponse = selecionarPrestador(nome as string)
    res.json(selecionarPrestadorResponse)
  } else {
    res.json({
      message: "Nome do prestador é obrigatório"
    })
  }

})




//selelcionar todos os utilizadores
app.get("/get-users",async (req: Request, res: Response) => {
  const getUsersResponse = await getUsers()

  res.json(getUsersResponse)
})



// selecionar utilizador pelo id
app.get("get-user-by-id", async (req: Request,res: Response)=> {
  const {id} = req.query

  if (id){
    const getUsersByIdResponse = await getUsersById(id as string)

    if(!getUsersByIdResponse){
      res.status(404).json({
        status:"error",
        message:"utilizador não encontrado",
        data:null
      })
    }

    res.status(200).json({
      status:"sucess",
      message:"utilizador encontrado",
      data:getUsersByIdResponse
    })

    //res.json(getUsersByIdResponse)
  }else{
    res.status(400).json({
      status:"error",
      message:"Id é Obrigatório",
      data:null
    })
  }
})



//criar utilizador
app.post("/create-user", async(req: Request, res: Response) =>{
  const user: UserType = req.body
  
  if(!user){
    res.status(400).json({
      status: "error",
      message:"Dados do utilizador Invalido",
      data: null
    })
  }
  console.log(user);

  const createUserResponse = await createUser(user)

  res.json(createUserResponse)

}) 

app.listen(8080, () => {
  console.log("Server running on port 8080")
})
