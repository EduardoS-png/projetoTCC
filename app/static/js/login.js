const formLogin = document.getElementById("login-caixa");
const btnSpinner = document.getElementById("btnSpinner");
const toastContainer = document.getElementById("toastContainer");

formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();

  const usuario = document.getElementById("usuario").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const estado = document.getElementById("estado").value;

  btnSpinner.style.display = "block";

  try {
    const resposta = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ usuario, senha, estado }),
    });

    if (!resposta.ok) {
      throw new Error(`Erro HTTP: ${resposta.status}`);
    }

    const dados = await resposta.json();

    if (dados.sucesso) {
      mostrarToast("Login realizado com sucesso!", "sucesso");

      setTimeout(() => {
        window.location.href = "/painelPrincipal";
      }, 1000);
    } else {
      mostrarToast(dados.mensagem || "Credenciais inválidas.", "erro");
    }
  } catch (erro) {
    console.error("Erro no login: ", erro);
    mostrarToast("Erro ao tentar login (Credenciais inválidas).", "erro");
  } finally {
    btnText.style.display = "block";
    btnSpinner.style.display = "none";
  }
});

function mostrarToast(mensagem, tipo = "sucesso", duracao = 4000) {
  const toast = document.createElement("div");
  toast.classList.add("toast", tipo);

  //Ícone
  const icon = document.createElement("span");
  icon.classList.add("icon");
  icon.textContent = tipo === "sucesso" ? "✅" : "⚠️";

  // Texto da mensagem
  const text = document.createElement("span");
  text.textContent = mensagem;

  // Botão de fechar
  const btnFechar = document.createElement("button");
  btnFechar.classList.add("fechar-btn");
  btnFechar.innerHTML = "&times;";

  btnFechar.addEventListener("click", () => {
    toast.classList.remove("show");
    setTimeout(() => toastContainer.removeChild(toast), 400);
  });

  toast.appendChild(icon);
  toast.appendChild(text);
  toast.appendChild(btnFechar);
  toastContainer.appendChild(toast);

  // Mostrar com animação
  setTimeout(() => toast.classList.add("show"), 100);

  // Remover automaticamente após a duração
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      if (toastContainer.contains(toast)) {
        toastContainer.removeChild(toast);
      }
    }, 400);
  }, duracao);
}
