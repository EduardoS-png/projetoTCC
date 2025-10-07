const modalFornecedor = document.getElementById("modalCadastroFornecedor");

const btnAbrirModalFornecedor = document.getElementById(
  "btnAbrirModalFornecedor"
);

btnAbrirModalFornecedor.addEventListener("click", () => {
  modalFornecedor.showModal();
  formCadastroFornecedor.reset();
});
const formCadastroFornecedor = document.getElementById(
  "formCadastroFornecedor"
);

const btnFecharModalFornecedor = document.getElementById(
  "botaoFecharFornecedor"
);

const btnCancelarModalFornecedor = document.getElementById(
  "botaoCancelarFornecedor"
);
const filtroNome = document.getElementById("filtroNomeFornecedor");
const tabela = document.getElementById("tabelaFornecedores");
const linhas = tabela
  .getElementsByTagName("tbody")[0]
  .getElementsByTagName("tr");

btnFecharModalFornecedor.addEventListener("click", () => {
  modalFornecedor.close();
  formCadastroFornecedor.reset();
});

btnCancelarModalFornecedor.addEventListener("click", () =>
  modalFornecedor.close()
);

modalFornecedor.addEventListener("click", (evento) => {
  const reacao = modalFornecedor.getBoundingClientRect();
  if (
    evento.clientX < reacao.left ||
    evento.clientX > reacao.right ||
    evento.clientY < reacao.top ||
    evento.clientY > reacao.bottom
  )
    modalFornecedor.close();
});

//editar fornecedor
const modalAlterarFornecedor = document.getElementById(
  "modalAlterarFornecedor"
);

const btnAbrirModalAlterarFornecedor = document.querySelectorAll(
  ".btnAbrirModalAlterarFornecedor"
);

const formAlterarFornecedor = document.getElementById("formAlterarFornecedor");

const btnFecharModalAlterarFornecedor = document.getElementById(
  "botaoFecharAlterarFornecedor"
);

const btnCancelarModalAlterarFornecedor = document.getElementById(
  "botaoCancelarAlterarFornecedor"
);

btnAbrirModalAlterarFornecedor.forEach((botao) => {
  botao.addEventListener("click", () => {
    const linha = botao.closest("tr");

    formAlterarFornecedor.reset();

    document.getElementById("idAlterar").value = botao.dataset.id;
    document.getElementById("nomeAlterar").value =
      linha.children[0].textContent.trim();
    document.getElementById("nomeFantasiaAlterar").value =
      linha.children[1].textContent.trim();
    document.getElementById("cnpjAlterar").value =
      linha.children[2].textContent.trim();
    document.getElementById("enderecoAlterar").value =
      linha.children[3].textContent.trim();
    document.getElementById("telefone1Alterar").value =
      linha.children[4].textContent.trim();
    document.getElementById("telefone2Alterar").value =
      linha.children[5].textContent.trim();

    modalAlterarFornecedor.showModal();
  });
});

btnFecharModalAlterarFornecedor.addEventListener("click", () => {
  modalAlterarFornecedor.close();
  formAlterarFornecedor.reset();
});

btnCancelarModalAlterarFornecedor.addEventListener("click", () =>
  modalAlterarFornecedor.close()
);

modalAlterarFornecedor.addEventListener("click", (evento) => {
  const reacao = modalAlterarFornecedor.getBoundingClientRect();
  if (
    evento.clientX < reacao.left ||
    evento.clientX > reacao.right ||
    evento.clientY < reacao.top ||
    evento.clientY > reacao.bottom
  )
    modalAlterarFornecedor.close();
});

function filtrarPorNomeFornecedor() {
  const nomeValue = filtroNome.value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  for (let linha of linhas) {
    const nomeProduto = linha.cells[1].textContent
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    // Armazena se a linha deve ser mostrada ou não
    linha.dataset.filtronome = nomeProduto.includes(nomeValue) ? "1" : "0";
  }
}

function aplicarTodosFiltros() {
  filtrarPorNomeFornecedor();

  for (let linha of linhas) {
    const mostra = linha.dataset.filtronome === "1";

    linha.style.display = mostra ? "" : "none";
  }
}

filtroNome.addEventListener("input", aplicarTodosFiltros);

const inputCnpj = document.getElementById("cnpj");
const inputTelefone1 = document.getElementById("telefone1");
const inputTelefone2 = document.getElementById("telefone2");

function mascaraInput(input, tipo) {
  input.addEventListener("input", () => {
    let valor = input.value.replace(/\D/g, "");

    if (tipo === "cnpj") {
      valor = valor.slice(0, 14);
      valor = valor.replace(/^(\d{2})(\d)/, "$1.$2");
      valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
      valor = valor.replace(/\.(\d{3})(\d)/, ".$1/$2");
      valor = valor.replace(/(\d{4})(\d{1,2})$/, "$1-$2");
    }

    if (tipo === "telefone1" || tipo === "telefone2") {
      valor = valor.slice(0, 11); // máximo 11 dígitos
      valor = valor.replace(/^(\d{2})(\d)/, "($1) $2");
      valor = valor.replace(/(\d{5})(\d{4})$/, "$1-$2");
    }

    input.value = valor;
  });
}

mascaraInput(inputCnpj, "cnpj");
mascaraInput(inputTelefone1, "telefone1");
mascaraInput(inputTelefone2, "telefone2");
