const modalConfiguracao = document.getElementById("modalCadastroConfiguracao");

const btnAbrirModalConfiguracao = document.getElementById("btnAbrirModalConfiguracao");

const formCadastroUsuario = document.getElementById("formCadastroUsuario");

const btnFecharUsuario = document.getElementById(
  "botaoFecharUsuario"
);

btnAbrirModalConfiguracao.addEventListener("click", () => {
  modalConfiguracao.showModal();
  formCadastroUsuario.reset();
});

const btnCancelarModalUsuario = document.getElementById("botaoCancelarUsuario");

btnCancelarModalUsuario.addEventListener("click", () => {
  modalConfiguracao.close();
  formCadastroUsuario.reset();
});

btnFecharUsuario.addEventListener("click", () => {
  modalEditarUsuario.close();
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
const modalEditarUsuario = document.getElementById("modalEditarUsuario");

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
