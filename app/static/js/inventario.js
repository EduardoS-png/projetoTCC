const modalCompra = document.getElementById("modalCadastroCompra");
const btnAbrirModalCompra = document.getElementById("btnAbrirModalCompra");
const btnFecharModalCompra = document.getElementById("botaoFecharCompra");
const btnCancelarModalCompra = document.getElementById("botaoCancelarCompra");
const formCadastroCompra = document.getElementById("formCadastroCompra");

const filtroNome = document.getElementById("filtroNomeInventario");
const tabela = document.getElementById("tabelaInventario");
const linhas = tabela
  .getElementsByTagName("tbody")[0]
  .getElementsByTagName("tr");

btnAbrirModalCompra.addEventListener("click", () => {
  modalCompra.showModal();
  formCadastroCompra.reset();
});

btnFecharModalCompra.addEventListener("click", () => {
  modalCompra.close();
});

btnCancelarModalCompra.addEventListener("click", () => {
  modalCompra.close();
});

function filtrarPorNome() {
  const nomeValue = filtroNome.value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  for (let linha of linhas) {
    const nomeProduto = linha.cells[1].textContent
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    linha.dataset.filtronome = nomeProduto.includes(nomeValue) ? "1" : "0";
  }
}

function aplicarTodosFiltros() {
  filtrarPorNome();

  for (let linha of linhas) {
    const mostra = linha.dataset.filtronome === "1";

    linha.style.display = mostra ? "" : "none";
  }
}

filtroNome.addEventListener("input", aplicarTodosFiltros);
