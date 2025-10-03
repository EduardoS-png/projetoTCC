const modalCompra = document.getElementById("modalCadastroCompra");
const btnAbrirModalCompra = document.getElementById("btnAbrirModalCompra");
const btnFecharModalCompra = document.getElementById("botaoFecharCompra");
const btnCancelarModalCompra = document.getElementById("botaoCancelarCompra");
const formCadastroCompra = document.getElementById("formCadastroCompra");

btnAbrirModalCompra.addEventListener("click", () => {
  modalCompra.showModal();
  formCadastroCompra.reset();
});

btnFecharModalCompra.addEventListener("click", () => {
  modalCompra.close();
});

btnCancelarModalCompra.addEventListener("click", () => {
  modalCompra.close();
});
