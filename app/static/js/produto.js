// MODAL CADASTRO
const modalProduto = document.getElementById("modalCadastroProduto");
const btnAbrirModalProduto = document.getElementById("btnAbrirModalProduto");
const formCadastroProduto = document.getElementById("formCadastroProduto");
const btnFecharModalProduto = document.getElementById("botaoFecharProduto");
const btnCancelarModalProduto = document.getElementById(
  "botaoCancelarCadastro"
);
const filtroNome = document.getElementById("filtroNome");
const filtroCategoria = document.getElementById("filtroCategoria");
const filtroFornecedor = document.getElementById("filtroFornecedor");
const tabela = document.getElementById("tabelaProdutos");
const linhas = tabela
  .getElementsByTagName("tbody")[0]
  .getElementsByTagName("tr");

btnAbrirModalProduto.addEventListener("click", () => {
  modalProduto.showModal();
  formCadastroProduto.reset();
});

btnFecharModalProduto.addEventListener("click", () => {
  modalProduto.close();
  formCadastroProduto.reset();
});

btnCancelarModalProduto.addEventListener("click", () => modalProduto.close());

modalProduto.addEventListener("click", (evento) => {
  const reacao = modalProduto.getBoundingClientRect();
  if (
    evento.clientX < reacao.left ||
    evento.clientX > reacao.right ||
    evento.clientY < reacao.top ||
    evento.clientY > reacao.bottom
  )
    modalProduto.close();
});

// MODAL ALTERAR
const modalAlterarProduto = document.getElementById("modalAlterarProduto");
const formAlterarProduto = document.getElementById("formAlterarProduto");
const btnFecharModalAlterarProduto =
  document.getElementById("botaoFecharAlterar");
const btnCancelarModalAlterarProduto = document.getElementById(
  "botaoCancelarAlterar"
);
const btnAbrirModalAlterarProduto = document.querySelectorAll(
  ".btnAbrirModalAlterarProduto"
);

btnAbrirModalAlterarProduto.forEach((botao) => {
  botao.addEventListener("click", () => {
    const linha = botao.closest("tr");

    formAlterarProduto.reset();

    document.getElementById("idAlterar").value = botao.dataset.id;
    document.getElementById("nomeAlterar").value =
      linha.children[1].textContent.trim();
    document.getElementById("categoriaAlterar").value =
      linha.dataset.categoriaId;
    document.getElementById("fornecedorAlterar").value =
      linha.dataset.fornecedorId;
    document.getElementById("codigoAlterar").value =
      linha.children[4].textContent.trim();
    document.getElementById("precoAlterar").value =
      parseFloat(linha.children[5].textContent.replace("R$", "").trim()) || 0;
    document.getElementById("marcaAlterar").value =
      linha.children[6].textContent.trim();
    document.getElementById("tamanhoAlterar").value =
      linha.children[7].textContent.trim();
    document.getElementById("corAlterar").value =
      linha.children[8].textContent.trim();
    document.getElementById("dataAlterar").value =
      linha.children[9].textContent.trim();

    modalAlterarProduto.showModal();
  });
});

btnFecharModalAlterarProduto.addEventListener("click", () => {
  modalAlterarProduto.close();
  formAlterarProduto.reset();
});

btnCancelarModalAlterarProduto.addEventListener("click", () =>
  modalAlterarProduto.close()
);

modalAlterarProduto.addEventListener("click", (evento) => {
  const reacao = modalAlterarProduto.getBoundingClientRect();
  if (
    evento.clientX < reacao.left ||
    evento.clientX > reacao.right ||
    evento.clientY < reacao.top ||
    evento.clientY > reacao.bottom
  )
    modalAlterarProduto.close();
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

function filtrarPorCategoria() {
  const categoriaValue = filtroCategoria.value;

  for (let linha of linhas) {
    const categoriaId = linha.dataset.categoriaId;
    linha.dataset.filtrocategoria =
      categoriaValue === "" || categoriaId === categoriaValue ? "1" : "0";
  }
}

function filtrarPorFornecedor() {
  const fornecedorValue = filtroFornecedor.value;

  for (let linha of linhas) {
    const fornecedorId = linha.dataset.fornecedorId;
    linha.dataset.filtrofornecedor =
      fornecedorValue === "" || fornecedorId === fornecedorValue ? "1" : "0";
  }
}

function aplicarTodosFiltros() {
  filtrarPorNome();
  filtrarPorCategoria();
  filtrarPorFornecedor();

  for (let linha of linhas) {
    const mostra =
      linha.dataset.filtronome === "1" &&
      linha.dataset.filtrocategoria === "1" &&
      linha.dataset.filtrofornecedor === "1";

    linha.style.display = mostra ? "" : "none";
  }
}

filtroNome.addEventListener("input", aplicarTodosFiltros);
filtroCategoria.addEventListener("change", aplicarTodosFiltros);
filtroFornecedor.addEventListener("change", aplicarTodosFiltros);

document.addEventListener("DOMContentLoaded", () => {
  const filtroStatus = document.getElementById("filtroStatus");
  const linhas = document.querySelectorAll("#tabelaProdutos tbody tr");

  aplicarFiltro(filtroStatus.value);

  filtroStatus.addEventListener("change", () => {
    const valorFiltro = filtroStatus.value;
    aplicarFiltro(valorFiltro);

    const novaUrl = new URL(window.location);
    novaUrl.searchParams.set("status", valorFiltro);
    window.history.replaceState({}, "", novaUrl);
  });

  function aplicarFiltro(valorFiltro) {
    linhas.forEach((linha) => {
      const statusSpan = linha.querySelector(".badge-status");
      const statusTexto = statusSpan
        ? statusSpan.textContent.trim().toLowerCase()
        : "";

      if (
        valorFiltro === "todos" ||
        (valorFiltro === "ativo" && statusTexto === "ativo") ||
        (valorFiltro === "inativo" && statusTexto === "inativo")
      ) {
        linha.style.display = "";
      } else {
        linha.style.display = "none";
      }
    });
  }
});
