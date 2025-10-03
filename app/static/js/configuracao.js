const modalConfiguracao = document.getElementById("modalCadastroConfiguracao");

const btnAbrirModalConfiguracao = document.getElementById(
  "btnAbrirModalConfiguracao"
);

const formCadastroUsuario = document.getElementById("formCadastroUsuario");

const btnFecharUsuario = document.getElementById("botaoFecharUsuario");

btnAbrirModalConfiguracao.addEventListener("click", () => {
  modalConfiguracao.showModal();
  formCadastroUsuario.reset();
});
const formCadastroFuncionario = document.getElementById(
  "formCadastroFuncionario"
);

const btnFecharModalFuncionario = document.getElementById(
  "botaoFecharConfiguracao"
);

const btnCancelarModalFuncionario = document.getElementById(
  "botaoCancelarFuncionario"
);

btnFecharModalFuncionario.addEventListener("click", () => {
  modalConfiguracao.close();
  formCadastroUsuario.reset();
});

modalConfiguracao.addEventListener("click", (evento) => {
  const reacao = modalConfiguracao.getBoundingClientRect();
  if (
    evento.clientX < reacao.left ||
    evento.clientX > reacao.right ||
    evento.clientY < reacao.top ||
    evento.clientY > reacao.bottom
  )
    modalConfiguracao.close();
});

//editar funcionario
const modalEditarFuncionario = document.getElementById(
  "modalEditarFuncionario"
);

const btnAbrirEditarUsuario = document.querySelectorAll(
  ".btnAbrirEditarUsuario"
);

const formEditarUsuario = document.getElementById("formEditarUsuario");

const btnFecharEditarUsuario = document.getElementById(
  "botaoCancelarEditarUsuario"
);

const btnCancelarEditarUsuario = document.getElementById(
  "botaoCancelarEditarUsuario"
);

btnAbrirEditarUsuario.forEach((botao) => {
  botao.addEventListener("click", () => {
    const linha = botao.closest("tr");

    formAlterarUsuario.reset();

    document.getElementById("idAlterar").value = botao.dataset.id;
    document.getElementById("nomeAlterar").value =
      linha.children[1].textContent.trim();
    document.getElementById("emailAlterar").value =
      linha.children[2].textContent.trim();
    document.getElementById("senhaAlterar").value =
      linha.children[3].textContent.trim();
    document.getElementById("statusAlterar").value =
      linha.children[4].textContent.trim();

    modalEditarUsuario.showModal();
  });
});

btnFecharEditarUsuario.addEventListener("click", () => {
  modalEditarUsuario.close();
});

btnCancelarEditarUsuario.addEventListener("click", () =>
  modalEditarUsuario.close()
);

modalEditarUsuario.addEventListener("click", (evento) => {
  const reacao = modalEditarUsuario.getBoundingClientRect();
  if (
    evento.clientX < reacao.left ||
    evento.clientX > reacao.right ||
    evento.clientY < reacao.top ||
    evento.clientY > reacao.bottom
  )
    modalEditarUsuario.close();
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

    // Armazena se a linha deve ser mostrada ou não
    linha.dataset.filtronome = nomeProduto.includes(nomeValue) ? "1" : "0";
  }
}

function aplicarTodosFiltros() {
  filtrarPorNome();

  for (let linha of linhas) {
    const mostra =
      linha.dataset.filtronome === "1" &&
      linha.dataset.filtrocategoria === "1" &&
      linha.dataset.filtrofornecedor === "1";

    linha.style.display = mostra ? "" : "none";
  }
}

filtroNome.addEventListener("input", aplicarTodosFiltros);
