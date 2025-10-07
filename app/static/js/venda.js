// Modal, formulário e container de itens
const modalVenda = document.getElementById("modalCadastroVenda");
const btnAbrirModalVenda = document.getElementById("btnAbrirModalVenda");
const btnFecharModalVenda = document.getElementById("botaoFecharVenda");
const btnCancelarModalVenda = document.getElementById("botaoCancelarVenda");
const formCadastroVenda = document.getElementById("formCadastroVenda");
const itensContainer = document.getElementById("itensVendaContainer");
const btnAdicionarItem = document.getElementById("adicionarItemVenda");

// Abrir modal
btnAbrirModalVenda.addEventListener("click", () => {
  modalVenda.showModal();
  formCadastroVenda.reset();

  // Limpa linhas extras, mantendo apenas a primeira
  const linhas = itensContainer.querySelectorAll(".itemVendaLinha");
  linhas.forEach((linha, index) => {
    if (index > 0) linha.remove();
  });

  // Reset do primeiro item
  const primeiraLinha = itensContainer.querySelector(".itemVendaLinha");
  primeiraLinha.querySelector(".produtoSelect").value = "";
  primeiraLinha.querySelector(".loteSelect").innerHTML =
    '<option value="">Selecione o lote</option>';
  primeiraLinha.querySelector('input[name="quantidade[]"]').value = "";
});

// Fechar modal
btnFecharModalVenda.addEventListener("click", () => modalVenda.close());
btnCancelarModalVenda.addEventListener("click", () => modalVenda.close());

modalVenda.addEventListener("click", (evento) => {
  const reacao = modalVenda.getBoundingClientRect();
  if (
    evento.clientX < reacao.left ||
    evento.clientX > reacao.right ||
    evento.clientY < reacao.top ||
    evento.clientY > reacao.bottom
  )
    modalVenda.close();
});

// Adicionar nova linha de item
btnAdicionarItem.addEventListener("click", () => {
  const linhaModelo = itensContainer.querySelector(".itemVendaLinha");
  const novoItem = linhaModelo.cloneNode(true);

  novoItem.querySelector(".produtoSelect").value = "";
  novoItem.querySelector(".loteSelect").innerHTML =
    '<option value="">Selecione o lote</option>';
  novoItem.querySelector('input[name="quantidade[]"]').value = "";

  itensContainer.appendChild(novoItem);
  anexaRemoverEvent(novoItem);
  anexarProdutoChange(novoItem);
});

// Botão remover linha
function anexaRemoverEvent(item) {
  const btn = item.querySelector(".removerItemVenda");
  btn.addEventListener("click", () => item.remove());
}

// Atualizar lotes quando muda o produto
function anexarProdutoChange(item) {
  const produtoSelect = item.querySelector(".produtoSelect");
  const loteSelect = item.querySelector(".loteSelect");

  produtoSelect.addEventListener("change", async () => {
    const produtoId = produtoSelect.value;
    loteSelect.innerHTML = '<option value="">Carregando...</option>';

    if (!produtoId) {
      loteSelect.innerHTML = '<option value="">Selecione o lote</option>';
      return;
    }

    try {
      const response = await fetch(`/venda/lotes/${produtoId}`);
      const data = await response.json();

      loteSelect.innerHTML = '<option value="">Selecione o lote</option>';
      data.lotes.forEach((lote) => {
        const option = document.createElement("option");
        option.value = lote.lote_id;
        option.textContent = `Lote ${lote.lote_id} - Qtd: ${
          lote.quantidade_atual
        } - R$ ${parseFloat(lote.preco_unitario).toFixed(2)}`;
        loteSelect.appendChild(option);
      });
    } catch (error) {
      console.error("Erro ao carregar lotes:", error);
      loteSelect.innerHTML = '<option value="">Erro ao carregar lotes</option>';
    }
  });
}

// Inicializa o evento do primeiro item
document.querySelectorAll(".itemVendaLinha").forEach((item) => {
  anexaRemoverEvent(item);
  anexarProdutoChange(item);
});

const modalCliente = document.getElementById("modalCadastroCliente");
const btnAbrirModalCliente = document.getElementById("btnAbrirModalCliente");
const btnFecharModalCliente = document.getElementById("botaoFecharCliente");
const btnCancelarModalCliente = document.getElementById("botaoCancelarCliente");
const formCadastroCliente = document.getElementById("formCadastroCliente");

btnAbrirModalCliente.addEventListener("click", () => {
  modalCliente.showModal();
  formCadastroCliente.reset();
});

btnFecharModalCliente.addEventListener("click", () => modalCliente.close());
btnCancelarModalCliente.addEventListener("click", () => modalCliente.close());

modalCliente.addEventListener("click", (evento) => {
  const reacao = modalCliente.getBoundingClientRect();
  if (
    evento.clientX < reacao.left ||
    evento.clientX > reacao.right ||
    evento.clientY < reacao.top ||
    evento.clientY > reacao.bottom
  )
    modalCliente.close();
});

const inputCpf = document.getElementById("cpf");
const inputTelefone = document.getElementById("telefone");

function mascaraInput(input, tipo) {
  input.addEventListener("input", () => {
    let valor = input.value.replace(/\D/g, "");

    if (tipo === "cpf") {
      valor = valor.slice(0, 11); // máximo 11 dígitos
      valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
      valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
      valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }

    if (tipo === "telefone") {
      valor = valor.slice(0, 11); // máximo 11 dígitos
      valor = valor.replace(/^(\d{2})(\d)/, "($1) $2");
      valor = valor.replace(/(\d{5})(\d{4})$/, "$1-$2");
    }

    input.value = valor;
  });
}

mascaraInput(inputCpf, "cpf");
mascaraInput(inputTelefone, "telefone");
