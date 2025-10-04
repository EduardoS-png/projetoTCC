from flask import Blueprint, render_template, request, redirect, url_for, flash
from app.models.compra import inserir_compra
from app.models.inventario import get_inventario
from app.models.fornecedor import get_fornecedores
from datetime import date

inventario_bp = Blueprint("inventario", __name__)

@inventario_bp.route("/inventario/lista", methods=["GET"])
def listar_inventario():
    produtos = get_inventario()
    fornecedores = get_fornecedores()
    return render_template("inventario.html", produtos=produtos, fornecedores=fornecedores, date=date)

@inventario_bp.route("/inventario/cadastrar", methods=["POST"])
def cadastrar_compra():
    try:
        produto_id = request.form["produto_id"]
        nome_produto = request.form["nome_produto"]
        fornecedor_id = request.form["fornecedor_id"]
        nome_fornecedor = request.form["nome_fornecedor"]
        quantidade = float(request.form["quantidade"])
        preco_unitario = float(request.form["preco_unitario"])
        preco_compra = float(request.form["preco_compra"])
        data_compra = request.form["data_compra"] or date.today().isoformat()

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
    except Exception as err:
        flash(f"❌ Erro ao cadastrar compra: {str(err)}", "danger")

    return redirect(url_for('inventario.listar_inventario'))

