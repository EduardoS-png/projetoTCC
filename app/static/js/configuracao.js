const modalCadastro = document.getElementById("modalCadastroConfiguracao");
const btnAbrirCadastro = document.getElementById("btnAbrirModalConfiguracao");
const btnFecharCadastro = document.getElementById("botaoFecharUsuario");
const btnCancelarCadastro = document.getElementById("botaoCancelarUsuario");
const formCadastro = document.getElementById("formCadastroUsuario");

btnAbrirCadastro.addEventListener("click", () => {
  modalCadastro.showModal();
  formCadastro.reset();
});

btnFecharCadastro.addEventListener("click", () => {
  modalCadastro.close();
  formCadastro.reset();
});

btnCancelarCadastro.addEventListener("click", () => {
  modalCadastro.close();
  formCadastro.reset();
});

// Modal Editar
const modalEditar = document.getElementById("modalEditarUsuario");
const btnFecharEditar = document.getElementById("botaoFecharEditarUsuario");
const btnCancelarEditar = document.getElementById("botaoCancelarEditarUsuario");
const formEditar = document.getElementById("formEditarUsuario");

const btnAbrirEditar = document.querySelectorAll(".btnAbrirEditarUsuario");

btnAbrirEditar.forEach((btn) => {
  btn.addEventListener("click", () => {
    const linha = btn.closest("tr");
    formEditar.reset();

    document.getElementById("idAlterar").value = btn.dataset.id;
    document.getElementById("nomeAlterar").value = linha.children[1].textContent.trim();
    document.getElementById("emailAlterar").value = linha.children[2].textContent.trim();
    document.getElementById("senhaAlterar").value = linha.children[3].textContent.trim();
    document.getElementById("statusAlterar").value = linha.children[4].textContent.trim();

    modalEditar.showModal();
  });
});

btnFecharEditar.addEventListener("click", () => {
  modalEditar.close();
  formEditar.reset();
});

btnCancelarEditar.addEventListener("click", () => {
  modalEditar.close();
  formEditar.reset();
});

// Filtro
const filtroNome = document.getElementById("filtroNome");
const linhas = document.querySelectorAll("#tabelaOperacoes tbody tr");

filtroNome.addEventListener("input", () => {
  const valor = filtroNome.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  linhas.forEach((linha) => {
    const nome = linha.cells[1].textContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    linha.style.display = nome.includes(valor) ? "" : "none";
  });
});
