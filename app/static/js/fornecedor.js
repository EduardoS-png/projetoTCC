const modalFornecedor = document.getElementById("modalCadastroFornecedor");

const btnAbrirModalFornecedor = document.getElementById(
  "btnAbrirModalFornecedor"
);

btnAbrirModalFornecedor.addEventListener("click", () => {
  modalFornecedor.showModal();
  formCadastroFornecedor.reset();
});
const formCadastroFornecedor = document.getElementById("formCadastroFornecedor");

const btnFecharModalFornecedor = document.getElementById("botaoFecharFornecedor");

const btnCancelarModalFornecedor = document.getElementById(
  "botaoCancelarFornecedor"
);

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
