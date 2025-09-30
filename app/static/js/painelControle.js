// Variáveis dos botões da página principal
const botaoMenu = document.getElementById("acessoNav");
const corpo = document.body;
const botoesNav = document.querySelectorAll(".navLink");
const sessoes = document.querySelectorAll("main section");
const chaveEstado = "abaAtiva";

// Variáveis para abrir e fechar os modais
const modalCadastro = document.getElementById("modalCadastroProduto");
const btnAbrirModalEstoque = document.getElementById("btnAbrirModalEstoque");
const btnFecharModalEstoque = document.getElementById("botaoFecharModal");
const btnCancelarModalEstoque = document.getElementById("botaoCancelarModal");

const modalCategoria = document.getElementById("modalCadastroCategoria");
const btnAbrirModalCategoria = document.getElementById(
  "btnAbrirModalCategoria"
);
const btnFecharModalCategoria = document.getElementById("botaoFecharCategoria");
const btnCancelarModalCategoria = document.getElementById(
  "botaoCancelarCategoria"
);

const modalCompras = document.getElementById("modalRegistroCompra");
const btnAbrirModalCompra = document.getElementById("btnAbrirModalCompra");
const btnFecharModalCompra = document.getElementById("botaoFecharCompra");
const btnCancelarModalCompra = document.getElementById("botaoCancelarCompra");

const modalVenda = document.getElementById("modalRegistroVenda");
const btnAbrirModalVenda = document.getElementById("btnAbrirModalVenda");
const btnFecharModalVenda = document.getElementById("botaoFecharVenda");
const btnCancelarModalVenda = document.getElementById("botaoCancelarVenda");

const btnFecharModalEditar = document.getElementById("botaoFecharModalEditar");
const btnCancelarModalEditar = document.getElementById(
  "botaoCancelarModalEditar"
);

const usuarioLogado = document.getElementById("bemVindo");
const btnLogout = document.getElementById("btnLogout");

// Variáveis de alteração do conteúdo do formulário
const formCadastroProduto = document.getElementById("formCadastroProduto");
const formRegistroCompra = document.getElementById("formRegistroCompra");
const formRegistroVenda = document.getElementById("formRegistroVenda");
const formCadastroCategoria = document.getElementById("formCadastroCategoria");
const toastContainer = document.getElementById("toastContainer");
const btnSpinner = document.getElementById("btnSpinner");
const filtroTipo = document.getElementById("filtroTipo");

const tabelaProdutos = document.querySelector("#tabelaProdutos");
const tabelaInativos = document.querySelector("#tabelaInativos");
const tabelaOperacoes = document.querySelector("#tabelaOperacoes");
const tabelaCompras = document.querySelector("#tabelaCompras");
const tabelaVendas = document.querySelector("#tabelaVendas");

const campoPesquisa = document.getElementById("campoPesquisa");
const select = document.getElementById("categoriaProduto");
const tabela = document
  .getElementById("tabelaProdutos")
  .getElementsByTagName("tbody")[0];

const produtoSelect = document.getElementById("produtoSelect");
const quantidadeProduto = document.getElementById("quantidadeProduto");
const btnAdicionarItem = document.getElementById("btnAdicionarItem");
const tabelaItensVenda = document
  .getElementById("tabelaItensVenda")
  .querySelector("tbody");
const valorTotalVenda = document.getElementById("valorTotalVenda");

let itensVenda = [];

// Botões para a navegação das abas principais
botaoMenu.addEventListener("click", () => {
  corpo.classList.toggle("navFechada");
});

function marcarBotaoAtivo(destino) {
  botoesNav.forEach((link) => {
    const ativo = link.dataset.destino === destino;
    link.classList.toggle("ativo", ativo);
  });
}

function mostrarSessaoAtiva(destino) {
  sessoes.forEach((sessao) => {
    sessao.style.display = sessao.id === destino ? "block" : "none";
  });
}

function salvarEstado(destino) {
  localStorage.setItem(chaveEstado, destino);
}

function ativarPagina(destino) {
  marcarBotaoAtivo(destino);
  mostrarSessaoAtiva(destino);
  salvarEstado(destino);
}

botoesNav.forEach((link) => {
  link.addEventListener("click", (evento) => {
    evento.preventDefault();
    const destino = link.dataset.destino;
    ativarPagina(destino);
  });
});

window.addEventListener("DOMContentLoaded", () => {
  const destinoSalvo = localStorage.getItem(chaveEstado) || "dashboard";
  ativarPagina(destinoSalvo);
});

function mostrarToast(mensagem, tipo = "sucesso", duracao = 4000) {
  const toast = document.createElement("div");
  toast.classList.add("toast", tipo);

  const icone = document.createElement("span");
  icone.classList.add("icon");
  icone.textContent = tipo === "sucesso" ? "✅" : "⚠️";

  const texto = document.createElement("span");
  texto.textContent = mensagem;

  const btnFechar = document.createElement("button");
  btnFechar.classList.add("fechar-btn");
  btnFechar.innerHTML = "&times;";

  btnFechar.addEventListener("click", () => {
    toast.classList.remove("show");
    setTimeout(() => toastContainer.removeChild(toast), 400);
  });

  toast.appendChild(icone);
  toast.appendChild(texto);
  toast.appendChild(btnFechar);
  toastContainer.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 100);

  // Remove automaticamente após a duração
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      if (toastContainer.contains(toast)) {
        toastContainer.removeChild(toast);
      }
    }, 400);
  }, duracao);
}

// -------- Modais --------
btnAbrirModalCompra.addEventListener("click", () => {
  modalCompras.showModal();
  carregarFornecedorModalCompras();
  formRegistroCompra.reset();
});

btnFecharModalCompra.addEventListener("click", () => {
  modalCompras.close();
  formRegistroCompra.reset();
});

btnCancelarModalCompra.addEventListener("click", () => modalCompras.close());

modalCompras.addEventListener("click", (evento) => {
  const reacao = modalCompras.getBoundingClientRect();
  if (
    evento.clientX < reacao.left ||
    evento.clientX > reacao.right ||
    evento.clientY < reacao.top ||
    evento.clientY > reacao.bottom
  )
    modalCompras.close();
});

btnAbrirModalVenda.addEventListener("click", () => {
  modalVenda.showModal();
  formRegistroVenda.reset();
});

btnFecharModalVenda.addEventListener("click", () => {
  modalVenda.close();
  formRegistroVenda.reset();
});

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

btnLogout.addEventListener("click", async () => {
  try {
    const resposta = await fetch("/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });

    if (resposta.ok) {
      const dados = await resposta.json();
      if (dados) {
        mostrarToast("Logout realizado com sucesso!", "sucesso");
        setTimeout(() => {
          window.location.href = "/login";
        }, 800);
      } else {
        mostrarToast("Erro ao sair.", "erro");
      }
    } else {
      mostrarToast("Erro na requisição.", "erro");
    }
  } catch (erro) {
    mostrarToast("Falha na conexão com o servidor.", "erro");
    console.error(erro);
  }
});

function mostrarEsqueleto(tabela, linhas = 5) {
  const tbody = tabela.querySelector("tbody");
  if (!tbody) return;

  const colunas = tabela.querySelectorAll("thead th").length;
  tbody.innerHTML = "";

  for (let i = 0; i < linhas; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < colunas; j++) {
      const td = document.createElement("td");
      td.classList.add("esqueleto");
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
}
