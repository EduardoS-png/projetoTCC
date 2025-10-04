from flask import Blueprint, render_template, request, redirect, url_for, flash
from app.models.compra import inserir_compra
from app.models.produto import get_produtos_id
from app.models.inventario import get_inventario
from app.models.fornecedor import get_fornecedores, get_fornecedor_id
from datetime import date
import traceback

inventario_bp = Blueprint("inventario", __name__)

@inventario_bp.route("/inventario/lista", methods=["GET"])
def listar_inventario():
    produtos = get_inventario()
    fornecedores = get_fornecedores()
    return render_template(
        "inventario.html",
        produtos=produtos,
        fornecedores=fornecedores,
        date=date
    )

@inventario_bp.route("/inventario/cadastrar", methods=["POST"])
def cadastrar_compra():
    try:
        produto_id = request.form.get("produto_id")
        fornecedor_id = request.form.get("fornecedor_id")
        quantidade = request.form.get("quantidade")
        preco_unitario = request.form.get("preco_unitario")
        preco_compra = request.form.get("preco_compra")
        data_compra = request.form.get("data_compra") or date.today().isoformat()

        # validação de campos obrigatórios
        if not produto_id or not fornecedor_id or not quantidade or not preco_unitario or not preco_compra:
            flash("❌ Todos os campos devem ser preenchidos!", "danger")
            return redirect(url_for('inventario.listar_inventario'))

        # conversão segura para int/float
        produto_id = int(produto_id)
        fornecedor_id = int(fornecedor_id)
        quantidade = float(quantidade)
        preco_unitario = float(preco_unitario)
        preco_compra = float(preco_compra)

        produto = get_produtos_id(produto_id)
        fornecedor = get_fornecedor_id(fornecedor_id)

        if not produto:
            flash("❌ Produto não encontrado!", "danger")
            return redirect(url_for('inventario.listar_inventario'))

        if not fornecedor:
            flash("❌ Fornecedor não encontrado!", "danger")
            return redirect(url_for('inventario.listar_inventario'))

        nome_produto = produto['nome']
        nome_fornecedor = fornecedor['nome_fantasia']

        # inserir compra
        inserir_compra(
            produto_id,
            nome_produto,
            fornecedor_id,
            nome_fornecedor,
            quantidade,
            preco_unitario,
            preco_compra,
            data_compra
        )

        flash("✅ Compra cadastrada com sucesso!", "success")

    except ValueError as ve:
        flash(f"❌ Erro de conversão: {str(ve)}", "danger")
    except Exception as err:
        import traceback
        print(traceback.format_exc())
        flash(f"❌ Erro ao cadastrar compra: {str(err)}", "danger")

    return redirect(url_for('inventario.listar_inventario'))



