import { promises as fs } from "fs"

import { error } from "console"

const { readFile, writeFile } = fs

async function getPedidos() {
  try {
    let pedidos = JSON.parse(await readFile("pedidos.json"))
    return pedidos
  } catch (err) {
    throw new error("Erro ao ler arquivo.")
  }
}

async function getPedido(id) {
  let pedidos = await getPedidos()
  let pedido = pedidos.pedidos.find((pedidos) => pedidos.id === id)
  if (pedido) {
    return pedido
  }
  throw new Error("Pedido não existe.")
}

async function createPedido(pedido) {
  const timeElapsed = Date.now()
  const date = new Date(timeElapsed)
  let pedidos = await getPedidos()
  pedido = {
    id: pedidos.nextId++,
    cliente: pedido.cliente,
    produto: pedido.produto,
    valor: pedido.valor,
    entregue: false,
    timestamp: date.toISOString(),
  }

  pedidos.pedidos.push(pedido)

  await writeFile("pedidos.json", JSON.stringify(pedidos, null, 2))
  return pedido
}

async function updatePedido(pedido) {
  let pedidos = await getPedidos()
  const index = pedidos.pedidos.findIndex((a) => a.id === pedido.id)

  if (index === -1) {
    throw new Error("Registro não encontrado.")
  }
  pedidos.pedidos[index].cliente = pedido.cliente
  pedidos.pedidos[index].produto = pedido.produto
  pedidos.pedidos[index].valor = pedido.valor
  pedidos.pedidos[index].entregue = pedido.entregue
  await writeFile("pedidos.json", JSON.stringify(pedidos, null, 2))
  return pedidos.pedidos[index]
}

async function updateEntrega(pedido) {
  let pedidos = await getPedidos()
  const index = pedidos.pedidos.findIndex((a) => a.id === pedido.id)

  if (index === -1) {
    throw new Error("Registro não encontrado.")
  }
  pedidos.pedidos[index].entregue = pedido.entregue
  await writeFile("pedidos.json", JSON.stringify(pedidos, null, 2))
  return pedidos.pedidos[index]
}

async function deletePedido(id) {
  let pedidos = await getPedidos()
  const index = pedidos.pedidos.findIndex((a) => a.id === id)

  if (index === -1) {
    throw new Error("Registro não encontrado.")
  }
  pedidos.pedidos = pedidos.pedidos.filter(
    (pedido) => pedido.id !== parseInt(id)
  )
  await writeFile("pedidos.json", JSON.stringify(pedidos, null, 2))
}

async function getTotalCliente(cliente) {
  let pedidos = await getPedidos()
  const index = pedidos.pedidos.findIndex((a) => a.cliente === cliente)

  if (index === -1) {
    throw new Error("Cliente não encontrado.")
  }
  const pedidosCliente = pedidos.pedidos.filter(
    (pedidos) => pedidos.cliente === cliente
  )
  let valorTotal = 0
  pedidosCliente.forEach((pedido) => {
    if (pedido.entregue) valorTotal += pedido.valor
  })
  let retorno = {
    cliente: cliente,
    valor: valorTotal,
  }
  return retorno
}

async function getTotalProduto(produto) {
  let pedidos = await getPedidos()
  const index = pedidos.pedidos.findIndex((a) => a.produto === produto)

  if (index === -1) {
    throw new Error("Produto não encontrado.")
  }
  const pedidosProduto = pedidos.pedidos.filter(
    (pedidos) => pedidos.produto === produto
  )
  let valorTotal = 0
  pedidosProduto.forEach((pedido) => {
    if (pedido.entregue) valorTotal += pedido.valor
  })
  let retorno = {
    produto: produto,
    valor: valorTotal,
  }
  return retorno
}

async function getProdutosMaisVendidos() {
  let pedidos = await getPedidos()
  let distinctProdutos = [
    ...new Set(pedidos.pedidos.map((item) => item.produto)),
  ]
  let produtosQtd = []
  distinctProdutos.forEach((produto) => {
    const pedidosProduto = pedidos.pedidos.filter(
      (pedidos) => pedidos.produto === produto && pedidos.entregue === true
    )
    let p = {
      produto,
      qtd: pedidosProduto.length,
    }
    produtosQtd.push(p)
  })
  produtosQtd.sort((a, b) => b.qtd - a.qtd)

  let maisvendidos = []

  produtosQtd.forEach((p) => {
    maisvendidos.push(p.produto + " - " + p.qtd)
  })
  return maisvendidos
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
