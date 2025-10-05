// Função para gerar cores consistentes
function gerarCores(qtd) {
  const paleta = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#8BC34A",
    "#E91E63",
  ];
  const cores = [];
  for (let i = 0; i < qtd; i++) {
    cores.push(paleta[i % paleta.length]);
  }
  return cores;
}

// Formata números em reais
function formatarReais(valor) {
  return (
    "R$ " +
    valor.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

// Configuração padrão de fontes para todos os gráficos
const fontePadrao = {
  family: "'Roboto', sans-serif",
  size: 14,
  weight: "500",
};

// --- Gráfico 1: Estoque por Categoria ---
if (Array.isArray(estoqueCategoriaData) && estoqueCategoriaData.length) {
  const ctxCategoria = document
    .getElementById("graficoCategoria")
    .getContext("2d");
  new Chart(ctxCategoria, {
    type: "doughnut",
    data: {
      labels: estoqueCategoriaData.map((e) => e.categoria_id),
      datasets: [
        {
          data: estoqueCategoriaData.map((e) => e.valor_estoque),
          backgroundColor: gerarCores(estoqueCategoriaData.length),
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Valor do Estoque por Categoria",
          font: fontePadrao,
        },
        legend: {
          position: "bottom",
          labels: { font: fontePadrao },
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const valor = context.raw;
              const label = context.label || "";
              return label + ": " + formatarReais(valor);
            },
          },
        },
      },
    },
  });
}

// --- Gráfico 2: Top Produtos ---
if (Array.isArray(topProdutosData) && topProdutosData.length) {
  const ctxTopProdutos = document
    .getElementById("graficoTopProdutos")
    .getContext("2d");
  new Chart(ctxTopProdutos, {
    type: "bar",
    data: {
      labels: topProdutosData.map((e) => e.produto),
      datasets: [
        {
          label: "Valor do Estoque (R$)",
          data: topProdutosData.map((e) => e.valor_estoque),
          backgroundColor: gerarCores(topProdutosData.length),
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Top Produtos por Valor em Estoque",
          font: fontePadrao,
        },
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function (context) {
              return formatarReais(context.raw);
            },
          },
        },
      },
      scales: {
        y: {
          ticks: {
            callback: function (value) {
              return formatarReais(value);
            },
            font: fontePadrao,
          },
          title: {
            display: true,
            text: "Valor em R$",
            font: fontePadrao,
          },
        },
        x: {
          ticks: { font: fontePadrao },
          title: {
            display: true,
            text: "Produto",
            font: fontePadrao,
          },
        },
      },
    },
  });
}

// --- Gráfico 3: Compras por Mês ---
if (Array.isArray(comprasMesData) && comprasMesData.length) {
  const ctxComprasMes = document
    .getElementById("graficoComprasMes")
    .getContext("2d");
  new Chart(ctxComprasMes, {
    type: "line",
    data: {
      labels: comprasMesData.map((e) => e.mes),
      datasets: [
        {
          label: "Total Compras (R$)",
          data: comprasMesData.map((e) => e.total_compras),
          borderColor: "#FF6384",
          backgroundColor: "rgba(255,99,132,0.2)",
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Total de Compras por Mês",
          font: fontePadrao,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return formatarReais(context.raw);
            },
          },
        },
      },
      scales: {
        y: {
          ticks: {
            callback: function (value) {
              return formatarReais(value);
            },
            font: fontePadrao,
          },
          title: {
            display: true,
            text: "Valor em R$",
            font: fontePadrao,
          },
        },
        x: {
          ticks: { font: fontePadrao },
          title: {
            display: true,
            text: "Mês",
            font: fontePadrao,
          },
        },
      },
    },
  });
}
