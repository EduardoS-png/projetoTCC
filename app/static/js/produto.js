// MODAL CADASTRO
const modalProduto = document.getElementById("modalCadastroProduto");
const btnAbrirModalProduto = document.getElementById("btnAbrirModalProduto");
const formCadastroProduto = document.getElementById("formCadastroProduto");
const btnFecharModalProduto = document.getElementById("botaoFecharProduto");
const btnCancelarModalProduto = document.getElementById(
  "botaoCancelarCadastro"
);

btnAbrirModalProduto.addEventListener("click", () => {
  modalProduto.showModal();
  formCadastroProduto.reset();
});

btnFecharModalProduto.addEventListener("click", () => {
  modalProduto.close();
  formCadastroProduto.reset();
});

btnCancelarModalProduto.addEventListener("click", () => modalProduto.close());

modalProduto.addEventListener("click", (evento) => {
  const reacao = modalProduto.getBoundingClientRect();
  if (
    evento.clientX < reacao.left ||
    evento.clientX > reacao.right ||
    evento.clientY < reacao.top ||
    evento.clientY > reacao.bottom
  )
    modalProduto.close();
});

// MODAL ALTERAR
const modalAlterarProduto = document.getElementById("modalAlterarProduto");
const formAlterarProduto = document.getElementById("formAlterarProduto");
const btnFecharModalAlterarProduto =
  document.getElementById("botaoFecharAlterar");
const btnCancelarModalAlterarProduto = document.getElementById(
  "botaoCancelarAlterar"
);
const btnAbrirModalAlterarProduto = document.querySelectorAll(
  ".btnAbrirModalAlterarProduto"
);

btnAbrirModalAlterarProduto.forEach((botao) => {
  botao.addEventListener("click", () => {
    const linha = botao.closest("tr");

    formAlterarProduto.reset();

    document.getElementById("idAlterar").value = botao.dataset.id;
    document.getElementById("nomeAlterar").value =
      linha.children[1].textContent.trim();
    document.getElementById("categoriaAlterar").value =
      linha.dataset.categoriaId;
    document.getElementById("fornecedorAlterar").value =
      linha.dataset.fornecedorId;
    document.getElementById("codigoAlterar").value =
      linha.children[4].textContent.trim();
    document.getElementById("precoAlterar").value =
      parseFloat(linha.children[5].textContent.replace("R$", "").trim()) || 0;
    document.getElementById("marcaAlterar").value =
      linha.children[6].textContent.trim();
    document.getElementById("tamanhoAlterar").value =
      linha.children[7].textContent.trim();
    document.getElementById("corAlterar").value =
      linha.children[8].textContent.trim();
    document.getElementById("dataAlterar").value =
      linha.children[9].textContent.trim();
    document.getElementById("quantidadeAlterar").value =
      linha.children[10].textContent.trim();

    modalAlterarProduto.showModal();
  });
});

btnFecharModalAlterarProduto.addEventListener("click", () => {
  modalAlterarProduto.close();
  formAlterarProduto.reset();
});

btnCancelarModalAlterarProduto.addEventListener("click", () =>
  modalAlterarProduto.close()
);

modalAlterarProduto.addEventListener("click", (evento) => {
  const reacao = modalAlterarProduto.getBoundingClientRect();
  if (
    evento.clientX < reacao.left ||
    evento.clientX > reacao.right ||
    evento.clientY < reacao.top ||
    evento.clientY > reacao.bottom
  )
    modalAlterarProduto.close();
});
