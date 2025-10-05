from flask import Blueprint, render_template
import plotly.graph_objects as go
from plotly.offline import plot
from app.models.compra import get_total_compras_hoje
from app.models.inventario import get_valor_total_estoque
from app.models.produto import get_total_produtos_ativos
from app.models.fornecedor import get_total_fornecedores_ativos
from app.models.dashboard import *
from datetime import date

dashboard_bp = Blueprint("dashboard", __name__)

@dashboard_bp.route("/dashboard/lista", methods=["GET"])
def dashboard():
    total_compras_hoje = get_total_compras_hoje()
    valor_estoque_total = get_valor_total_estoque()
    total_produtos_ativos = get_total_produtos_ativos()
    total_fornecedores_ativos = get_total_fornecedores_ativos()

    # Dados para gráficos
    estoque_categoria = get_estoque_por_categoria()
    top_produtos = get_top_produtos_estoque()
    produtos_fornecedor = get_produtos_por_fornecedor()

    # --- Gráfico 1: Estoque por Categoria (Pie) ---
    fig_categoria = go.Figure(
        data=[go.Pie(
            labels=[e['categoria'] for e in estoque_categoria],
            values=[e['valor_estoque'] for e in estoque_categoria],
            hole=0.4
        )]
    )
    fig_categoria.update_layout(title_text="Valor do Estoque por Categoria")
    grafico_categoria = plot(fig_categoria, output_type='div', include_plotlyjs=False)

    # --- Gráfico 2: Top Produtos (Bar) ---
    fig_top = go.Figure(
        data=[go.Bar(
            x=[e['produto'] for e in top_produtos],
            y=[e['valor_estoque'] for e in top_produtos],
            marker_color='#36A2EB'
        )]
    )
    fig_top.update_layout(title_text="Top Produtos por Valor em Estoque", xaxis_title="Produto", yaxis_title="Valor em R$")
    grafico_top_produtos = plot(fig_top, output_type='div', include_plotlyjs=False)

    # --- Gráfico 3: Compras por Mês (Line) ---
    fig_fornecedor = go.Figure(
        data=[go.Bar(
            x=[e['fornecedor'] for e in produtos_fornecedor],
            y=[e['quantidade_produtos'] for e in produtos_fornecedor],
            marker_color='#FF9F40'
        )]
    )
    fig_fornecedor.update_layout(
        title_text="Top Fornecedores por Quantidade de Produtos",
        xaxis_title="Fornecedor",
        yaxis_title="Quantidade de Produtos"
    )
    grafico_fornecedor = plot(fig_fornecedor, output_type='div', include_plotlyjs=False)

    return render_template(
        "dashboard.html",
        total_compras_hoje=total_compras_hoje,
        valor_estoque_total=valor_estoque_total,
        total_produtos_ativos=total_produtos_ativos,
        total_fornecedores_ativos=total_fornecedores_ativos,
        estoque_categoria=estoque_categoria,
        top_produtos=top_produtos,
        grafico_categoria=grafico_categoria,
        grafico_top_produtos=grafico_top_produtos,
        grafico_compras_mes=grafico_fornecedor,
        date=date
    )
