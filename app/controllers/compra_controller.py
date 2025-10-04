from flask import Blueprint, render_template
from app.models.compra import *
from app.models.produto import get_produtos_id

compra_bp = Blueprint("compra", __name__)

@compra_bp.route("/compra/produto/<int:produto_id>", methods=["GET"])
def compras_por_produto(produto_id):
    produto = get_produtos_id(produto_id)
    compras = get_compras_por_produto(produto_id)
    return render_template("compra.html", produto=produto, compras=compras)
