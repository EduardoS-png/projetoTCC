const formLogin = document.getElementById("login-caixa");
const btnSpinner = document.getElementById("btnSpinner");
const btnText = document.getElementById("btnText");

formLogin.addEventListener("submit", async (event) => {
  event.preventDefault();

  btnText.style.display = "none";
  btnSpinner.style.display = "inline-block";

  const formData = new FormData(formLogin);
  const response = await fetch("/login", {
    method: "POST",
    body: formData,
  });

  const result = await response.json();

  if (result.success) {
    if (result.status === "Administrador") {
      window.location.href = "/dashboard/lista";
    } else {
      window.location.href = "/venda/lista";
    }
  } else {
    alert("Login inválido");
    btnText.style.display = "inline";
    btnSpinner.style.display = "none";
  }
});
