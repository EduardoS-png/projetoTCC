import { carregarProdutos, carregarVendas } from './painelControle';

// -------- REGISTRO DE VENDAS --------
formRegistroVenda.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const produtoId = document.getElementById("produtoIdVenda").value;
  const quantidadeDesejada = document.getElementById("quantidadeVenda").value;

  if (!produtoId || !quantidadeDesejada || quantidadeDesejada <= 0) {
    mostrarToast("Preencha todos os campos corretamente!", "erro");
    return;
  }

  const dadosVenda = {
    produto_id: parseInt(produtoId),
    quantidade_desejada: parseInt(quantidadeDesejada),
  };

  try {
    const resposta = await fetch("/vendas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dadosVenda),
    });

    const resultado = await resposta.json();

    if (resposta.ok && resultado.status) {
      mostrarToast(resultado.mensagem || "Venda realizada com sucesso!");
      formRegistroVenda.reset();
      modalVenda.close();
      carregarProdutos();
      carregarVendas();
    } else {
      mostrarToast(
        resultado.mensagem || "Erro ao realizar venda.",
        "erro"
      );
    }
  } catch (erro) {
    console.error("Erro ao registrar venda:", erro);
    mostrarToast("Erro ao registrar venda.", "erro");
  }
});