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

const btnAbrirAlterarCategoria = document.querySelectorAll(
  ".btnAbrirAlterarCategoria"
);

const formAlterarCategoria = document.getElementById("formAlterarCategoria");

const btnFecharAlterarCategoria = document.getElementById(
  "botaoFecharAlterarCategoria"
);

const btnCancelarAlterarCategoria = document.getElementById(
  "botaoAlterarCategoria"
);

btnAbrirAlterarCategoria.forEach((botao) => {
  botao.addEventListener("click", () => {
    const linha = botao.closest("tr");

    formAlterarCategoria.reset();

    document.getElementById("idAlterar").value = botao.dataset.id;
    document.getElementById("nomeAlterar").value =
      linha.children[1].textContent.trim();
    document.getElementById("descricaoAlterar").value =
      linha.children[2].textContent.trim();

    modalAlterarCategoria.showModal();
  });
});

btnFecharAlterarCategoria.addEventListener("click", () => {
  modalAlterarCategoria.close();
});

btnCancelarAlterarCategoria.addEventListener("click", () =>
  modalAlterarCategoria.close()
);

modalAlterarCategoria.addEventListener("click", (evento) => {
  const reacao = modalAlterarCategoria.getBoundingClientRect();
  if (
    evento.clientX < reacao.left ||
    evento.clientX > reacao.right ||
    evento.clientY < reacao.top ||
    evento.clientY > reacao.bottom
  )
    modalAlterarCategoria.close();
});
