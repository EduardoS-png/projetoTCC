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

const modalCompras = document.getElementById("modalRegistroCompra");
const btnAbrirModalCompra = document.getElementById("btnAbrirModalCompra");
const btnFecharModalCompra = document.getElementById("botaoFecharCompra");
const btnCancelarModalCompra = document.getElementById("botaoCancelarCompra");

const usuarioLogado = document.getElementById("bemVindo");
const btnLogout = document.getElementById("btnLogout");

// Variáveis de alteração do conteúdo do formulário
const formCadastroProduto = document.getElementById("formCadastroProduto");
const formRegistroCompra = document.getElementById("formRegistroCompra");
const formCadastroCategoria = document.getElementById("formCadastroCategoria");
const toastContainer = document.getElementById("toastContainer");
const btnSpinner = document.getElementById("btnSpinner");
const filtroTipo = document.getElementById("filtroTipo");

const tabelaProdutos = document.querySelector("#tabelaProdutos");
const tabelaInativos = document.querySelector("#tabelaInativos");
const tabelaOperacoes = document.querySelector("#tabelaOperacoes");
const tabelaCompras = document.querySelector("#tabelaCompras");

const campoPesquisa = document.getElementById("campoPesquisa");
const select = document.getElementById("categoriaProduto");

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

// function mostrarSessaoAtiva(destino) {
//   sessoes.forEach((sessao) => {
//     sessao.style.display = sessao.id === destino ? "block" : "none";
//   });
// }

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
        alert("Logout realizado com sucesso!", "sucesso");
        setTimeout(() => {
          window.location.href = "/login";
        }, 800);
      } else {
        alert("Erro ao sair.", "erro");
      }
    } else {
      alert("Erro na requisição.", "erro");
    }
  } catch (erro) {
    console.error(erro);
  }
});
