const modalFornecedor = document.getElementById("modalCadastroFornecedor");

const btnAbrirModalFornecedor = document.getElementById(
  "btnAbrirModalFornecedor"
);

btnAbrirModalFornecedor.addEventListener("click", () => {
  modalFornecedor.showModal();
  formCadastroFornecedor.reset();
});
const formCadastroFornecedor = document.getElementById(
  "formCadastroFornecedor"
);

const btnFecharModalFornecedor = document.getElementById(
  "botaoFecharFornecedor"
);

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

//editar fornecedor
const modalAlterarFornecedor = document.getElementById(
  "modalAlterarFornecedor"
);

const btnAbrirModalAlterarFornecedor = document.querySelectorAll(
  ".btnAbrirModalAlterarFornecedor"
);

const formAlterarFornecedor = document.getElementById("formAlterarFornecedor");

const btnFecharModalAlterarFornecedor = document.getElementById(
  "botaoFecharAlterarFornecedor"
);

const btnCancelarModalAlterarFornecedor = document.getElementById(
  "botaoCancelarAlterarFornecedor"
);

btnAbrirModalAlterarFornecedor.forEach((botao) => {
  botao.addEventListener("click", () => {
    const linha = botao.closest("tr");

    formAlterarFornecedor.reset();

    document.getElementById("idAlterar").value = botao.dataset.id;
    document.getElementById("nomeAlterar").value =
      linha.children[1].textContent.trim();
    document.getElementById("nomeFantasiaAlterar").value =
      linha.children[2].textContent.trim();
    document.getElementById("cnpjAlterar").value =
      linha.children[3].textContent.trim();
    document.getElementById("enderecoAlterar").value =
      linha.children[4].textContent.trim();
    document.getElementById("telefone1Alterar").value =
      linha.children[5].textContent.trim();
    document.getElementById("telefone2Alterar").value =
      linha.children[6].textContent.trim();

    modalAlterarFornecedor.showModal();
  });
});

btnFecharModalAlterarFornecedor.addEventListener("click", () => {
  modalAlterarFornecedor.close();
  formAlterarFornecedor.reset();
});

btnCancelarModalAlterarFornecedor.addEventListener("click", () =>
  modalAlterarFornecedor.close()
);

modalAlterarFornecedor.addEventListener("click", (evento) => {
  const reacao = modalAlterarFornecedor.getBoundingClientRect();
  if (
    evento.clientX < reacao.left ||
    evento.clientX > reacao.right ||
    evento.clientY < reacao.top ||
    evento.clientY > reacao.bottom
  )
    modalAlterarFornecedor.close();
});
