import express from "express"
import { promises as fs } from "fs"
import pedidoRouter from "./routes/pedido.routes.js"
import cors from 'cors'

const { readFile, writeFile } = fs
const app = express()
app.use(cors())
app.use(express.json())
app.use("/pedidos", pedidoRouter)

app.get("/", async (req, res) => {
  res.send("Delivery API")
})

app.listen(3000, () => {
  console.log("API started!")
})
