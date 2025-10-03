const modalConfiguracao = document.getElementById("modalCadastroConfiguracao");

const btnAbrirModalConfiguracao = document.getElementById(
  "btnAbrirModalConfiguracxao"
);

btnAbrirModalCategoria.addEventListener("click", () => {
  modalConfiguracao.showModal();
  formCadastroFuncionario.reset();
});
const formCadastroFuncionario = document.getElementById("formCadastroFuncionario");

const btnFecharModalFuncionario = document.getElementById("botaoFecharConfiguracao");

const btnCancelarModalFuncionario = document.getElementById(
  "botaoCancelarFuncionario"
);

btnFecharModalFuncionario.addEventListener("click", () => {
  modalConfiguracao.close();
  formCadastroFuncionario.reset();
});

btnCancelarModalFuncionario.addEventListener("click", () =>
  modalConfiguracao.close()
);

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

//editar categoria
const modalEditarFuncionario = document.getElementById("modalEditarFuncionario");

const btnAbrirEditarFuncionario = document.querySelectorAll(
  ".btnAbrirEditarFuncionario"
);

const formEditarFuncionario = document.getElementById("formEditarFuncionario");

const btnFecharEditarFuncionario = document.getElementById(
  "botaoFecharEditarFuncionario"
);

const btnCancelarEditarFuncionario = document.getElementById(
  "botaoCancelarEditarFuncionario"
);

btnAbrirEditarFuncionario.forEach((botao) => {
  botao.addEventListener("click", () => {
    const linha = botao.closest("tr");

    formAlterarCategoria.reset();

    document.getElementById("idAlterar").value = botao.dataset.id;
    document.getElementById("nomeAlterar").value =
      linha.children[1].textContent.trim();
    document.getElementById("emailAlterar").value =
      linha.children[2].textContent.trim();
    document.getElementById("senhaAlterar").value =
      linha.children[3].textContent.trim();
    document.getElementById("statusAlterar").value =
      linha.children[4].textContent.trim();

    modalEditarFuncionario.showModal();
  });
});

btnFecharEditarFuncionario.addEventListener("click", () => {
  modalEditarFuncionario.close();
});

btnCancelarEditarFuncionario.addEventListener("click", () =>
  modalEditarFuncionario.close()
);

modalEditarFuncionario.addEventListener("click", (evento) => {
  const reacao = modalEditarFuncionario.getBoundingClientRect();
  if (
    evento.clientX < reacao.left ||
    evento.clientX > reacao.right ||
    evento.clientY < reacao.top ||
    evento.clientY > reacao.bottom
  )
    modalEditarFuncionario.close();
});
