import express from "express"
import type { Request, Response } from "express"
import { router as serviceRouter } from "./routes/servico.route.js"
import { router as orcamentoRouter } from "./routes/orcamento.route.js"
import { router as prestadorRouter } from "./routes/prestador.route.js"
import { router as userRouter } from "./routes/users.route.js"
import { router as propostaRouter } from "./routes/proposta.route.js"
import { router as prestacaoServicoRouter } from "./routes/prestacao-servico.route.js"
import { swaggerSpec } from "./docs/swagger.js"
import swaggerUi from "swagger-ui-express"

// Factory to create an Express app instance. This makes it testable.
export const createApp = () => {
  const app = express()
  app.use(express.json())

  app.use("/service", serviceRouter)
  app.use("/orcamento", orcamentoRouter)
  app.use("/prestador", prestadorRouter)
  app.use("/users", userRouter)
  app.use("/proposta", propostaRouter)
  app.use("prestacao-servico", prestacaoServicoRouter)

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!")
  })

  return app
}

export default createApp
