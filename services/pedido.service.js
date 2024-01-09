import pedidoRepository from "../repository/pedido.repository.js"

async function getPedidos() {
  return await pedidoRepository.getPedidos()
}

async function getPedido(id) {
  return await pedidoRepository.getPedido(id)
}

async function createPedido(pedido) {
  return await pedidoRepository.createPedido(pedido)
}

async function updatePedido(pedido) {
  return await pedidoRepository.updatePedido(pedido)
}

async function updateEntrega(pedido) {
  return await pedidoRepository.updateEntrega(pedido)
}

async function deletePedido(id) {
  return await pedidoRepository.deletePedido(id)
}

async function getTotalCliente(cliente) {
  return await pedidoRepository.getTotalCliente(cliente)
}

async function getTotalProduto(produto) {
  return await pedidoRepository.getTotalProduto(produto)
}

async function getProdutosMaisVendidos() {
  return await pedidoRepository.getProdutosMaisVendidos()
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
