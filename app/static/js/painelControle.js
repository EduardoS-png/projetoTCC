// Variáveis dos botões da página principal
const botaoMenu = document.getElementById("acessoNav");
const corpo = document.body;
const botoesNav = document.querySelectorAll(".navLink");
const chaveEstado = "abaAtiva";
const btnLogout = document.getElementById("btnLogout");

botaoMenu.addEventListener("click", () => {
  corpo.classList.toggle("navFechada");
});

function marcarBotaoAtivo(destino) {
  localStorage.setItem(chaveEstado, destino);

  botoesNav.forEach((link) => {
    const ativo = link.getAttribute("href") === destino;
    link.classList.toggle("ativo", ativo);
  });
}

// Adiciona evento de clique
botoesNav.forEach((link) => {
  link.addEventListener("click", () => {
    const destino = link.getAttribute("href");
    marcarBotaoAtivo(destino);
  });
});

// Quando recarregar, restaura última aba
const abaSalva = localStorage.getItem(chaveEstado);
if (abaSalva) {
  marcarBotaoAtivo(abaSalva);
}

btnLogout.addEventListener("click", async () => {
  try {
    const resposta = await fetch("/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });

    // Se houver redirect do Flask, segue para login
    if (resposta.redirected) {
      window.location.href = resposta.url;
    } else {
      // fallback: recarrega a página caso não tenha redirect
      window.location.href = "/login";
    }
  } catch (erro) {
    console.error("Erro no logout:", erro);
    alert("Não foi possível sair, tente novamente.");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const alerts = document.querySelectorAll("#flash-container .alert");

  alerts.forEach((alert) => {
    setTimeout(() => alert.classList.add("show"), 50);
    setTimeout(() => {
      alert.classList.add("fade-out");
      setTimeout(() => alert.remove(), 600);
    }, 3000);
  });
});
