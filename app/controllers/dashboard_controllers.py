from flask import Blueprint, render_template
from app.models.compra import get_total_compras_hoje
from app.models.inventario import get_valor_total_estoque
from app.models.produto import get_total_produtos_ativos
from app.models.fornecedor import get_total_fornecedores_ativos
from app.models.dashboard import get_estoque_por_categoria, get_top_produtos_estoque, get_vendas_por_semana
from datetime import date
import json

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
    vendas_semana = get_vendas_por_semana()

    # Converter valores de Decimal para float
    grafico_categoria_data = {
        "labels": [e['categoria'] for e in estoque_categoria],
        "values": [float(e['valor_estoque']) for e in estoque_categoria]
    }

    grafico_top_produtos_data = {
        "labels": [e['produto'] for e in top_produtos],
        "values": [float(e['valor_estoque']) for e in top_produtos]
    }

    grafico_vendas_semana_data = {
        "labels": [e['semana'] for e in vendas_semana],
        "values": [float(e['total']) for e in vendas_semana]
    }

    return render_template(
        "dashboard.html",
        total_compras_hoje=float(total_compras_hoje),
        valor_estoque_total=float(valor_estoque_total),
        total_produtos_ativos=total_produtos_ativos,
        total_fornecedores_ativos=total_fornecedores_ativos,
        grafico_categoria=json.dumps(grafico_categoria_data),
        grafico_top_produtos=json.dumps(grafico_top_produtos_data),
        grafico_vendas_semana=json.dumps(grafico_vendas_semana_data),
        date=date
    )

