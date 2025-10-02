const modalCategoria = document.getElementById("modalCadastroCategoria");

const btnAbrirModalCategoria = document.getElementById(
  "btnAbrirModalCategoria"
);

btnAbrirModalCategoria.addEventListener("click", () => {
  modalCategoria.showModal();
  formCadastroCategoria.reset();
});
const formCadastroCategoria = document.getElementById("formCadastroCategoria");

const btnFecharModalCategoria = document.getElementById("botaoFecharCategoria");

const btnCancelarModalCategoria = document.getElementById(
  "botaoCancelarCategoria"
);

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



//editar categoria


const modalAlterarCategoria = document.getElementById("modalAlterarCategoria");

const btnAbrirAlterarCategoria = document.getElementById(
  "btnAbrirAlterarCategoria"
);

const formAlterarCategoria = document.getElementById("formAlterarCategoria");

const btnFecharAlterarCategoria = document.getElementById("botaoAlterarCategoria");

const btnCancelarAlterarCategoria = document.getElementById(
  "botaoAlterarCategoria"
);

btnFecharAlterarCategoria.addEventListener("click", () => {
  modalAlterarCategoria.close();
  formAlterarCategoria.reset();
});

btnCancelarAlterarCategoria.addEventListener("click", () =>
  modalAlterarCategoria.close()
);

modalAlterarCategoria.addEventListener("click", (evento) => {
  const reacao = modaAlterarlCategoria.getBoundingClientRect();
  if (
    evento.clientX < reacao.left ||
    evento.clientX > reacao.right ||
    evento.clientY < reacao.top ||
    evento.clientY > reacao.bottom
  )
    modalAlterarCategoria.close();
});

