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

btnAbrirModalCategoria.addEventListener("click", () => {
  modalCategoria.showModal();
  formCadastroCategoria.reset();
});

btnFecharModalCategoria.addEventListener("click", () => {
  modalCategoria.close();
  formCadastroCategoria.reset();
});

btnCancelarModalCategoria.addEventListener("click", () =>
  modalCategoria.close()
);

modalCategoria.addEventListener("click", (evento) => {
  const reacao = modalCategoria.getBoundingClientRect();
  if (
    evento.clientX < reacao.left ||
    evento.clientX > reacao.right ||
    evento.clientY < reacao.top ||
    evento.clientY > reacao.bottom
  )
    modalCategoria.close();
});

btnAbrirModalEstoque.addEventListener("click", () => {
  modalCadastro.showModal();
  formCadastroProduto.reset();
});

btnFecharModalEstoque.addEventListener("click", () => {
  modalCadastro.close();
  formCadastroProduto.reset();
});

btnCancelarModalEstoque.addEventListener("click", () => modalCadastro.close());

modalCadastro.addEventListener("click", (evento) => {
  const reacao = modalCadastro.getBoundingClientRect();
  if (
    evento.clientX < reacao.left ||
    evento.clientX > reacao.right ||
    evento.clientY < reacao.top ||
    evento.clientY > reacao.bottom
  )
    modalCadastro.close();
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

async function carregarUsuarioLogado() {
  if (btnSpinner) btnSpinner.style.display = "inline-block";

  try {
    const resposta = await fetch("/api/usuarioLogado", {
      method: "GET",
      credentials: "include",
    });

    if (resposta.ok) {
      const usuario = await resposta.json();
      usuarioLogado.innerText = "Bem-vindo(a), " + usuario.nome;
    } else {
      usuarioLogado.innerText = "Bem-vindo(a), visitante";
    }
  } catch (erro) {
    console.error("Erro ao carregar usuário logado:", erro);
    usuarioLogado.innerText = "Bem-vindo(a), visitante";
  } finally {
    btnSpinner.style.display = "none";
  }
}

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

// Carregar os produtos
async function carregarProdutos(categoria_id = "") {
  const tabela = tabelaProdutos;

  mostrarEsqueleto(tabela, 5);

  try {
    let url = "/api/produtos";
    if (categoria_id) {
      url += `?categoria=${categoria_id}`;
    }

    const resposta = await fetch(url);
    const produtos = await resposta.json();

    const linhas = produtos.length || 5;
    mostrarEsqueleto(tabela, linhas);

    const tbody = tabela.querySelector("tbody");
    tbody.innerHTML = "";

    produtos.forEach((produto) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="linhaTabela">${produto.id}</td>
        <td class="linhaTabela">${produto.nome}</td>
        <td class="linhaTabela">${produto.categoria}</td>
        <td class="linhaTabela">${produto.codigo_original || ""}</td>
        <td class="linhaTabela">R$ ${parseFloat(produto.preco_base).toFixed(
          2
        )}</td>
        <td class="linhaTabela">${produto.marca || ""}</td>
        <td class="linhaTabela">${produto.tamanho || ""}</td>
        <td class="linhaTabela">${produto.cor || ""}</td>
        <td class="linhaTabela">${new Date(
          produto.data_cadastro
        ).toLocaleDateString("pt-BR")}</td>
        <td class="linhaTabela">${produto.quantidade || 0}</td>
        <td class="linhaTabela acoes">
          <button class="botoesDecisao btnEditarProduto" data-id="${
            produto.id
          }">
            <img src="/static/assets/icons/editar.svg" alt="editar.svg" />
          </button>
          <button class="botoesDecisao btnInativarProduto" data-id="${
            produto.id
          }">
            <img src="/static/assets/icons/inativar.svg" alt="inativar.svg" />
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    document.querySelectorAll(".btnInativarProduto").forEach((botao) => {
      botao.addEventListener("click", async () => {
        const id = botao.getAttribute("data-id");

        if (!confirm("Tem certeza que deseja inativar este produto?")) return;

        try {
          const resposta = await fetch(`/api/produtos/${id}`, {
            method: "DELETE",
          });

          if (resposta.ok) {
            mostrarToast("Produto inativado com sucesso!", "sucesso");
            carregarProdutos(tipo);
          } else {
            mostrarToast("Erro ao inativar produto", "erro");
          }
        } catch (erro) {
          console.error("Erro ao inativar produto:", erro);
          mostrarToast("Erro ao inativar produto", "erro");
        }
      });
    });
  } catch (erro) {
    console.error("Erro ao carregar produtos:", erro);
    mostrarToast("Erro ao carregar produtos", "erro");
  }
}

async function carregarProdutosInativos() {
  const tabela = tabelaInativos;

  mostrarEsqueleto(tabela, 5);

  try {
    const url = "/api/produtos/inativos";
    const resposta = await fetch(url);
    const produtos = await resposta.json();

    const linhas = produtos.length || 5;
    mostrarEsqueleto(tabela, linhas);

    const tbody = tabela.querySelector("tbody");
    tbody.innerHTML = "";

    produtos.forEach((produto) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="linhaTabela">${produto.id}</td>
        <td class="linhaTabela">${produto.nome}</td>
        <td class="linhaTabela">${produto.tipo}</td>
        <td class="linhaTabela">${produto.codigo_original || ""}</td>
        <td class="linhaTabela">R$ ${parseFloat(produto.preco_base).toFixed(
          2
        )}</td>
        <td class="linhaTabela">${produto.marca || ""}</td>
        <td class="linhaTabela">${produto.tamanho || ""}</td>
        <td class="linhaTabela">${produto.cor || ""}</td>
        <td class="linhaTabela">${new Date(
          produto.data_cadastro
        ).toLocaleDateString("pt-BR")}</td>
        <td class="linhaTabela">${produto.quantidade || 0}</td>
        <td class="linhaTabela acoes">
          <button class="botoesDecisao btnReativarProduto" data-id="${
            produto.id
          }">
            <img src="/static/assets/icons/reativar.svg" alt="reativar.svg" />
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    document.querySelectorAll(".btnReativarProduto").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        try {
          const resposta = await fetch(`/api/produtos/reativar/${id}`, {
            method: "PUT",
          });
          if (resposta.ok) {
            mostrarToast("Produto reativado com sucesso!", "sucesso");
            carregarProdutosInativos();
          } else {
            mostrarToast("Erro ao reativar produto", "erro");
          }
        } catch (erro) {
          console.error("Erro ao reativar produto:", erro);
          mostrarToast("Erro ao reativar produto", "erro");
        }
      });
    });
  } catch (erro) {
    console.error("Erro ao carregar produtos inativos:", erro);
    mostrarToast("Erro ao carregar produtos inativos", "erro");
  }
}

async function carregarCategorias() {
  select.innerHTML = '<option value="" selected>Selecione</option>';

  try {
    const resposta = await fetch("/api/categorias");
    const categorias = await resposta.json();

    categorias.forEach((categoria) => {
      const option = document.createElement("option");
      option.value = categoria.id;
      option.textContent = categoria.nome;

      option.title = categoria.descricao || "Sem descrição";

      select.appendChild(option);
    });
  } catch (erro) {
    console.error("Erro ao carregar categorias", erro);
    mostrarToast("Erro ao carregar categorias", "erro");
  }
}

filtroTipo.addEventListener("change", () => {
  carregarProdutos(filtroTipo.value);
});

// -------- CRUD produtos --------
formCadastroProduto.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const dados = {
    nome: document.getElementById("nomeProduto").value,
    codigo_original: document.getElementById("codigoProduto").value,
    preco_base: parseFloat(document.getElementById("precoProduto").value),
    marca: document.getElementById("marcaProduto").value,
    tamanho: document.getElementById("tamanhoProduto").value,
    cor: document.getElementById("corProduto").value,
    data_cadastro: document.getElementById("dataCadastroProduto").value,
    quantidade_inicial:
      parseInt(document.getElementById("quantidadeProduto").value) || 0,
    categoria_id: parseInt(document.getElementById("categoriaProduto").value),
  };

  if (
    !dados.nome ||
    !dados.codigo_original ||
    isNaN(dados.preco_base) ||
    dados.preco_base <= 0 ||
    isNaN(dados.categoria_id)
  ) {
    mostrarToast("Preencha corretamente todos os campos obrigatórios!", "erro");
    return;
  }

  try {
    const resposta = await fetch("/api/produtos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    const resultado = await resposta.json();

    if (resposta.ok) {
      mostrarToast("Produto cadastrado com sucesso!");
      resetarFormulario();
      carregarProdutos(filtroTipo.value);
    } else {
      mostrarToast(resultado.erro || "Erro ao cadastrar produto", "erro");
    }
  } catch (erro) {
    console.error("Erro ao cadastrar produto:", erro);
    mostrarToast("Falha na conexão com o servidor.", "erro");
  }
});

async function abrirEditarProduto(id) {
  try {
    const resposta = await fetch(`/api/produtos/${id}`);
    if (!resposta.ok) throw new Error("Produto não encontrado");

    console.log(resposta);
    const produto = await resposta.json();
    console.log(produto);

    document.getElementById("editarProdutoId").value = produto.id;
    document.getElementById("editarNomeProduto").value = produto.nome;
    document.getElementById("editarCodigoProduto").value =
      produto.codigo_original;
    document.getElementById("editarPrecoProduto").value = produto.preco_base;
    document.getElementById("editarMarcaProduto").value = produto.marca || "";
    document.getElementById("editarTamanhoProduto").value =
      produto.tamanho || "";
    document.getElementById("editarCorProduto").value = produto.cor || "";
    document.getElementById("editarDataCadastroProduto").value =
      produto.data_cadastro;
    document.getElementById("editarQuantidadeProduto").value =
      produto.quantidade;
    document.getElementById("editarTipoProduto").value = produto.tipo;

    abrirModalEdicao();
  } catch (erro) {
    console.error("Erro ao atualizar produto:", erro);
    mostrarToast("Erro ao atualizar produto.", "erro");
  }
}

function abrirModalEdicao() {
  const modalEditar = document.getElementById("modalEditarProduto");
  if (typeof modalEditar.showModal === "function") {
    modalEditar.showModal();
  } else {
    modalEditar.style.display = "block";
  }
}

function fecharModalEdicao() {
  const modalEditar = document.getElementById("modalEditarProduto");
  if (typeof modalEditar.close === "function") {
    modalEditar.close();
  } else {
    modalEditar.style.display = "none";
  }
}

btnCancelarModalEditar.addEventListener("click", fecharModalEdicao);
btnFecharModalEditar.addEventListener("click", fecharModalEdicao);

async function salvarEdicaoProduto() {
  const produtoId = document.getElementById("editarProdutoId").value;
  const dados = {
    nome: document.getElementById("editarNomeProduto").value,
    codigo_original: document.getElementById("editarCodigoProduto").value,
    preco_base: document.getElementById("editarPrecoProduto").value,
    marca: document.getElementById("editarMarcaProduto").value,
    tamanho: document.getElementById("editarTamanhoProduto").value,
    cor: document.getElementById("editarCorProduto").value,
    data_cadastro: document.getElementById("editarDataCadastroProduto").value,
    quantidade:
      parseInt(document.getElementById("editarQuantidadeProduto").value) || 0,
  };

  try {
    const resposta = await fetch(`/api/produtos/${produtoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    const resultado = await resposta.json();

    if (resultado.ok) {
      mostrarToast(
        resultado.mensagem || "Produto atualizado com sucesso!",
        "sucesso"
      );
      fecharModalEdicao();
      carregarProdutos();
    } else {
      mostrarToast(resposta.erro || "Erro ao atualizar produto.", "erro");
    }
  } catch (erro) {
    console.error("Erro ao atualizar produto:", erro);
    mostrarToast("Erro ao atualizar produto.", "erro");
  }
}

formCadastroCategoria.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const dados = {
    nome: document.getElementById("nomeCategoria").value,
    descricao: document.getElementById("descricaoCategoria").value,
  };

  if (!dados.nome) {
    mostrarToast("Preencha corretamente todos os campos obrigatórios!", "erro");
    return;
  }

  try {
    const resposta = await fetch("/api/categorias", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    const resultado = await resposta.json();

    if (resposta.ok) {
      mostrarToast("Categoria cadastrada com sucesso!");
      resetarFormulario();
      carregarProdutos(filtroTipo.value);
    } else {
      mostrarToast(resultado.erro || "Erro ao cadastrar categoria", "erro");
    }
  } catch (erro) {
    console.error("Erro ao cadastrar categoria:", erro);
    mostrarToast("Falha na conexão com o servidor.", "erro");
  }
});

campoPesquisa.addEventListener("keyup", function () {
  const filtro = campoPesquisa.value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const linhas = tabela.querySelectorAll("tbody tr");

  linhas.forEach((linha) => {
    if (linha.querySelector(".esqueleto")) return;

    const colunaNome = linha.getElementsByTagName("td")[1];
    if (colunaNome) {
      const textoNome = colunaNome.textContent
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      linha.style.display = textoNome.includes(filtro) ? "" : "none";
    }
  });
});

document.addEventListener("click", (evento) => {
  const btnEditarProduto = evento.target.closest(".btnEditarProduto");

  if (btnEditarProduto) {
    abrirEditarProduto(btnEditarProduto.dataset.id);
  }
});

async function carregarResumoProdutos() {
  try {
    const resposta = await fetch("/api/produtos/resumo");

    if (resposta.ok) {
      const dados = await resposta.json();
      const totalSpan = document.getElementById("totalQuant");
      totalSpan.textContent = dados.total;

      const baixoEstoqSpan = document.getElementById("baixoEstoq");
      baixoEstoqSpan.textContent = dados.baixo_estoque;

      const semEstoqSpan = document.getElementById("semEstoq");
      semEstoqSpan.textContent = dados.sem_estoque;
    }
  } catch (erro) {
    console.error("Erro ao carregar total de produtos:", erro);
  }
}

export async function carregarCompras() {
  const tabela = tabelaCompras;

  mostrarEsqueleto(tabela, 5);

  try {
    let url = "/api/compra";

    const resposta = await fetch(url);
    const compras = await resposta.json();

    const linhas = compras.length || 5;
    mostrarEsqueleto(tabela, linhas);

    const tbody = tabela.querySelector("tbody");
    tbody.innerHTML = "";

    compras.forEach((compra) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="linhaTabela">${compra.id}</td>
        <td class="linhaTabela">${compra.produto_id}</td>
        <td class="linhaTabela">${compra.nome_produto}</td>
        <td class="linhaTabela">${compra.fornecedor_id}</td>
        <td class="linhaTabela">R$ ${compra.nome_fornecedor}</td>
        <td class="linhaTabela">${compra.quantidade || 0}</td>
        <td class="linhaTabela">${compra.categoria}</td>
        <td class="linhaTabela">R$ ${parseFloat(compra.preco_compra).toFixed(
          2
        )}</td>
        <td class="linhaTabela">${new Date(
          compra.data_compra
        ).toLocaleDateString("pt-BR")}</td>
        
        <td class="linhaTabela acoes">
          <button class="botoesDecisao btnEditarCompra" data-id="${compra.id}">
            <img src="/static/assets/icons/editar.svg" alt="editar.svg" />
          </button>
          <button class="botoesDecisao btnDeletarCompra" data-id="${compra.id}">
            <img src="/static/assets/icons/inativar.svg" alt="inativar.svg" />
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (erro) {
    console.error("Erro ao carregar as compras:", erro);
    mostrarToast("Erro ao carregar as compras", "erro");
  }
}

async function carregarFornecedorModalCompras() {
  try {
    let url = "/api/fornecedor";

    const resposta = await fetch(url);
    const fornecedores = await resposta.json();
    let select = document.getElementById("fornecedor_id");

    fornecedores.forEach((fornecedor) => {
      let option = document.createElement("option");
      option.setAttribute("value", fornecedor.id);
      option.innerHTML = `${fornecedor.nome_fantasia}`;

      select.appendChild(option);
    });
  } catch (erro) {
    console.error("Erro ao carregar os fornecedores:", erro);
    mostrarToast("Erro ao carregar os fornecedores", "erro");
  }
}

export async function carregarVendas() {
  const tabela = tabelaVendas;

  mostrarEsqueleto(tabela, 5);

  try {
    const resposta = await fetch("/api/venda");
    const vendas = await resposta.json();

    const linhas = vendas.length || 5;
    mostrarEsqueleto(tabela, linhas);

    const tbody = tabela.querySelector("tbody");
    tbody.innerHTML = "";

    vendas.forEach((venda) => {
      const totalVenda =
        (venda.quantidade || 0) * parseFloat(venda.preco_venda || 0);

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="linhaTabela">${venda.id}</td>
        <td class="linhaTabela">${venda.produto_nome}</td>
        <td class="linhaTabela">${venda.produto_id}</td>
        <td class="linhaTabela">${venda.cliente_nome}</td>
        <td class="linhaTabela">${venda.quantidade || 0}</td>
        <td class="linhaTabela">R$ ${totalVenda.toFixed(2)}</td>
        <td class="linhaTabela">${new Date(venda.data_venda).toLocaleDateString(
          "pt-BR"
        )}</td>
        <td class="linhaTabela acoes">
          <button class="botoesDecisao btnEditarVenda" data-id="${venda.id}">
            <img src="/static/assets/icons/editar.svg" alt="editar.svg" />
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (erro) {
    console.error("Erro ao carregar as vendas:", erro);
    mostrarToast("Erro ao carregar as vendas", "erro");
  }
}

async function carregarProdutosSelect() {
  const resposta = await fetch("/api/produtos");
  const produtos = await resposta.json();

  produtoSelect.innerHTML =
    '<option value="" disabled selected>Selecione o Produto</option>';
  produtos.forEach((produto) => {
    const option = document.createElement("option");
    option.value = produto.id;
    option.textContent = `${produto.nome} - R$ ${parseFloat(
      produto.preco_base
    ).toFixed(2)}`;
    option.dataset.preco = produto.preco_base;
    produtoSelect.appendChild(option);
  });
}

function atualizarTabelaItens() {
  tabelaItensVenda.innerHTML = "";
  let total = 0;

  itensVenda.forEach((item, index) => {
    const subtotal = item.quantidade * item.precoUnit;
    total += subtotal;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="linhaTabela">${item.produtoNome}</td>
      <td class="linhaTabela">${item.quantidade}</td>
      <td class="linhaTabela">R$ ${item.precoUnit.toFixed(2)}</td>
      <td class="linhaTabela"><button type="button" data-index="${index}" class="btnRemoverItem">Remover</button></td>
    `;
    tabelaItensVenda.appendChild(tr);
  });

  valorTotalVenda.value = total.toFixed(2);

  document.querySelectorAll(".btnRemoverItem").forEach((botao) => {
    botao.addEventListener("click", () => {
      const idx = parseInt(botao.dataset.index);
      itensVenda.splice(idx, 1);
      atualizarTabelaItens();
    });
  });
}

btnAdicionarItem.addEventListener("click", () => {
  const produtoId = parseInt(produtoSelect.value);
  const produtoNome =
    produtoSelect.options[produtoSelect.selectedIndex].text.split(" - ")[0];
  const precoUnit = parseFloat(
    produtoSelect.options[produtoSelect.selectedIndex].dataset.preco
  );
  const quantidade = parseInt(quantidadeProduto.value);

  if (!produtoId || quantidade <= 0) {
    alert("Selecione produto e quantidade válida");
    return;
  }

  itensVenda.push({ produtoId, produtoNome, quantidade, precoUnit });

  atualizarTabelaItens();
  quantidadeProduto.value = "";
  produtoSelect.value = "";
});

formRegistroVenda.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  if (itensVenda.length === 0) {
    alert("Adicione pelo menos um item na venda.");
    return;
  }

  const dadosVenda = {
    cliente: document.getElementById("clienteVenda").value,
    data_venda: document.getElementById("dataVenda").value,
    forma_pagamento: document.getElementById("formaPagamentoVenda").value,
    itens: itensVenda,
    valor_total: parseFloat(valorTotalVenda.value),
  };

  try {
    const resposta = await fetch("/api/vendas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dadosVenda),
    });
    const resultado = await resposta.json();

    if (resposta.ok && resultado.status) {
      mostrarToast(resultado.mensagem || "Venda registrada com sucesso!");
      itensVenda = [];
      atualizarTabelaItens();
      formRegistroVenda.reset();
      modalVenda.close();
      carregarProdutos();
      carregarVendas();
    } else {
      mostrarToast(resultado.mensagem || "Erro ao registrar venda", "erro");
    }
  } catch (erro) {
    console.error("Erro ao registrar venda:", erro);
    mostrarToast("Erro ao registrar venda", "erro");
  }
});

async function carregarUsuarios() {
  const tabela = tabelaOperacoes;

  mostrarEsqueleto(tabela, 5);

  try {
    let url = "/api/usuario";

    const resposta = await fetch(url);
    const usuarios = await resposta.json();

    const linhas = usuarios.length || 5;
    mostrarEsqueleto(tabela, linhas);

    const tbody = tabela.querySelector("tbody");
    tbody.innerHTML = "";

    usuarios.forEach((usuario) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="linhaTabela">${usuario.id}</td>
        <td class="linhaTabela">${usuario.nome}</td>
        <td class="linhaTabela">${usuario.email}</td>
        <td class="linhaTabela">${usuario.senha}</td>
        <td class="linhaTabela">R$ ${usuario.status}</td>
        <td class="linhaTabela acoes">
          <button class="botoesDecisao btnEditarUsuario" data-id="${usuario.id}">
            <img src="/static/assets/icons/editar.svg" alt="editar.svg" />
          </button>
          <button class="botoesDecisao btnDeletarUsuario" data-id="${usuario.id}">
            <img src="/static/assets/icons/lixeira.svg" alt="lixeira.svg" />
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (erro) {
    console.error("Erro ao carregar usuários:", erro);
    mostrarToast("Erro ao carregar usuários", "erro");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  carregarUsuarioLogado();
  carregarProdutos();
  carregarProdutosInativos();
  carregarCategorias();
  carregarResumoProdutos();
  carregarCompras();
  carregarProdutosSelect();
  carregarVendas();
  carregarUsuarios();
});
