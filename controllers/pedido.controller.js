import pedidoService from "../services/pedido.service.js"

async function getPedidos(req, res, next) {
  try {
    res.send(await pedidoService.getPedidos())
  } catch (err) {
    next(err)
  }
}

async function getPedido(req, res, next) {
  try {
    let id = parseInt(req.params.id)
    let pedido = await pedidoService.getPedido(id)
    res.send(pedido)
  } catch (err) {
    next(err)
  }
}

async function createPedido(req, res, next) {
  try {
    let pedido = req.body
    if (
      pedido.cliente == null ||
      pedido.valor == null ||
      pedido.produto == null ||
      pedido.cliente.trim() == "" ||
      pedido.produto.trim() == ""
    ) {
      throw new Error("Cliente, valor e produto são obrigatórios.")
    }
    let novoPedido = await pedidoService.createPedido(pedido)
    res.send(novoPedido)
  } catch (err) {
    next(err)
  }
}

async function updatePedido(req, res, next) {
  try {
    let pedido = req.body
    if (
      !pedido.id ||
      pedido.cliente == null ||
      pedido.valor == null ||
      pedido.produto == null ||
      pedido.entregue == null ||
      pedido.cliente.trim() == "" ||
      pedido.produto.trim() == ""
    ) {
      throw new Error("Id, Cliente, valor e produto são obrigatórios.")
    }
    let pedidoAlterado = await pedidoService.updatePedido(pedido)
    res.send(pedidoAlterado)
  } catch (err) {
    next(err)
  }
}

async function updateEntrega(req, res, next) {
  try {
    let pedido = req.body
    if (!pedido.id || pedido.entregue == null) {
      throw new Error("Id e entregue são obrigatórios.")
    }
    let pedidoAlterado = await pedidoService.updateEntrega(pedido)
    res.send(pedidoAlterado)
  } catch (err) {
    next(err)
  }
}

async function deletePedido(req, res, next) {
  try {
    let id = parseInt(req.params.id)
    let pedido = await pedidoService.deletePedido(id)
    res.end()
  } catch (err) {
    next(err)
  }
}

async function getTotalCliente(req, res, next) {
  try {
    let dados = req.body
    let totalCliente = await pedidoService.getTotalCliente(dados.cliente)
    res.send(totalCliente)
  } catch (err) {
    next(err)
  }
}

async function getTotalProduto(req, res, next) {
  try {
    let dados = req.body
    let totalProduto = await pedidoService.getTotalProduto(dados.produto)
    res.send(totalProduto)
  } catch (err) {
    next(err)
  }
}

async function getProdutosMaisVendidos(req, res, next) {
  try {
    let maisVendidos = await pedidoService.getProdutosMaisVendidos()
    res.send(maisVendidos)
  } catch (err) {
    next(err)
  }
}

export default {
  getPedidos,
  getPedido,
  createPedido,
  updatePedido,
  updateEntrega,
  deletePedido,
  getTotalCliente,
  getTotalProduto,
  getProdutosMaisVendidos,
}
