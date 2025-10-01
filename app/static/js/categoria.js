const modalCategoria = document.getElementById("modalCadastroCategoria");

const formCadastroCategoria = document.getElementById("formCadastroCategoria");

const btnAbrirModalCategoria = document.getElementById(
  "btnAbrirModalCategoria"
);

const btnFecharModalCategoria = document.getElementById("botaoFecharCategoria");

const btnCancelarModalCategoria = document.getElementById(
  "botaoCancelarCategoria"
);

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
