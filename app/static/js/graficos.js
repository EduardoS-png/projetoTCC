let graficoVendas, graficoEstoque, graficoItens;

function criarGraficos(dadosVendas, dadosEstoque, dadosItens) {
  const ctx1 = document.getElementById("chartContainer1").getContext("2d");
  const ctx2 = document.getElementById("chartContainer2").getContext("2d");
  const ctx3 = document.getElementById("chartContainer3").getContext("2d");

  const dataAtual = new Date();
  const mesAtual = dataAtual.toLocaleString("pt-BR", { month: "long" });

  // Gráfico 1 - Vendas
  graficoVendas = new Chart(ctx1, {
    type: "bar",
    data: {
      labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
      datasets: [
        {
          label: "R$ em Vendas",
          data: dadosVendas,
          backgroundColor: [
            "rgba(54, 162, 235, 0.8)",
            "rgba(75, 192, 192, 0.8)",
            "rgba(0, 128, 255, 0.8)",
            "rgba(153, 102, 255, 0.8)",
          ],
          borderRadius: 8,
          borderColor: [
            "rgba(54, 162, 235, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(0, 128, 255, 1)",
            "rgba(153, 102, 255, 1)",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: `Total de Vendas Mensais - ${mesAtual}`,
          font: { size: 20, weight: "bold" },
          color: "#1f3b73",
        },
        tooltip: {
          callbacks: {
            label: (ctx) => `R$ ${ctx.raw.toLocaleString("pt-BR")}`,
          },
        },
        legend: { display: false },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "#1f3b73", font: { size: 14, weight: "bold" } },
        grid: { color: "rgba(31, 59, 115, 0.15)" },
      },
      x: {
        ticks: { color: "#1f3b73", font: { size: 14, weight: "bold" } },
        grid: { display: false },
      },
    },
  });

  // Gráfico 2 - Situação do estoque
  graficoEstoque = new Chart(ctx2, {
    type: "bar",
    data: {
      labels: ["Em estoque", "Baixo estoque", "Não está em estoque"],
      datasets: [
        {
          label: "Quantidade",
          data: dadosEstoque,
          backgroundColor: [
            "rgba(97, 192, 75, 0.8)",
            "rgba(255, 247, 0, 0.8)",
            "rgba(255, 102, 102, 0.8)",
          ],
          borderRadius: 8,
          borderColor: [
            "rgba(97, 192, 75, 1)",
            "rgba(255, 247, 0, 1)",
            "rgba(255, 102, 102, 1)",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "Situação do estoque em relação aos itens",
          font: { size: 20, weight: "bold" },
          color: "#1f3b73",
        },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.raw.toLocaleString("pt-BR")} itens`,
          },
        },
        legend: { display: false },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: "#1f3b73", font: { size: 14, weight: "bold" } },
          grid: { color: "rgba(31, 59, 115, 0.15)" },
        },
        x: {
          ticks: { color: "#1f3b73", font: { size: 14, weight: "bold" } },
          grid: { display: false },
        },
      },
    },
  });

  // Gráfico 3 - Itens no estoque
  graficoItens = new Chart(ctx3, {
    type: "pie",
    data: {
      labels: ["Linhas", "Tecidos", "Produtos extras"],
      datasets: [
        {
          data: dadosItens,
          backgroundColor: [
            "rgba(75, 192, 192, 0.9)",
            "rgba(0, 128, 255, 0.9)",
            "rgba(153, 102, 255, 0.9)",
          ],
          hoverOffset: 15,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "Quantidade de itens no estoque",
          font: { size: 20, weight: "bold" },
          color: "#1f3b73",
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const total = ctx.chart.data.datasets[0].data.reduce(
              (a, b) => a + b,
              0
            );
            const valor = ctx.raw;
            const porcentagem = ((valor / total) * 100).toFixed(1);
            return `${ctx.label}: ${valor} itens (${porcentagem}%)`;
          },
        },
      },
    },
  });
}

// Atualizar gráficos sem recarregar a página
function atualizarGraficos(novosVendas, novosEstoque, novosItens) {
  if (graficoVendas && graficoEstoque && graficoItens) {
    graficoVendas.data.datasets[0].data = novosVendas;
    graficoEstoque.data.datasets[0].data = novosEstoque;
    graficoItens.data.datasets[0].data = novosItens;

    graficoVendas.update();
    graficoEstoque.update();
    graficoItens.update();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  criarGraficos(
    [1200, 1900, 2200, 2800],
    [1200, 1900, 3000],
    [1200, 1900, 3000]
  );
  atualizarGraficos();
});

setTimeout(() => {
  atualizarGraficos(
    [1500, 2000, 2500, 3000],
    [1100, 1800, 2900],
    [1300, 1800, 3200]
  );
}, 5000);
