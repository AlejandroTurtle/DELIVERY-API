import express from "express"
import { promises as fs } from "fs"
import pedidoController from "../controllers/pedido.controller.js"

const { readFile, writeFile } = fs

const router = express.Router()

router.get("/", pedidoController.getPedidos)
router.get("/produtosMaisVendidos", pedidoController.getProdutosMaisVendidos)
router.get("/:id", pedidoController.getPedido)
router.post("/", pedidoController.createPedido)
router.put("/", pedidoController.updatePedido)
router.patch("/updateEntrega", pedidoController.updateEntrega)
router.delete("/:id", pedidoController.deletePedido)
router.post("/totalCliente", pedidoController.getTotalCliente)
router.post("/totalProduto", pedidoController.getTotalProduto)

export default router
