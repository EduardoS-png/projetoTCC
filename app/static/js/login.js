const formLogin = document.getElementById("login-caixa");
const btnSpinner = document.getElementById("btnSpinner");
const btnText = document.getElementById("btnText");

formLogin.addEventListener("submit", () => {
  btnText.style.display = "none";
  btnSpinner.style.display = "inline-block";
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
