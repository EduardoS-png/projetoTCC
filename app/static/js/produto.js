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

// Seleciona todos os botões de edição da tabela
const btnsAbrirModalAlterarProduto = document.querySelectorAll(
  ".btnAbrirModalAlterarProduto"
);

btnsAbrirModalAlterarProduto.forEach((btn) => {
  btn.addEventListener("click", () => {
    const row = btn.closest("tr");
    if (!row) return;

    // Preencher os campos do modal com os dados da linha
    formAlterarProduto.reset();
    document.getElementById("idAlterar").value = btn.dataset.id;
    document.getElementById("nomeAlterar").value =
      row.children[1].textContent.trim();
    document.getElementById("categoriaAlterar").value = row.dataset.categoriaId;
    document.getElementById("fornecedorAlterar").value =
      row.dataset.fornecedorId;
    document.getElementById("codigoAlterar").value =
      row.children[4].textContent.trim();
    document.getElementById("precoAlterar").value =
      parseFloat(row.children[5].textContent.replace("R$", "").trim()) || 0;
    document.getElementById("marcaAlterar").value =
      row.children[6].textContent.trim();
    document.getElementById("tamanhoAlterar").value =
      row.children[7].textContent.trim();
    document.getElementById("corAlterar").value =
      row.children[8].textContent.trim();
    document.getElementById("dataAlterar").value =
      row.children[9].textContent.trim();
    document.getElementById("quantidadeAlterar").value =
      row.children[10].textContent.trim();

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
