from flask import Blueprint,render_template
from app.models.compra import *

compra_bp = Blueprint("compra", __name__)

@compra_bp.route("/produto/<int:produto_id>/compras")
def compras_por_produto(produto_id):
    compras = compras.query.filter_by(produto_id  = produto_id).all()
     
    return render_template("compras.html", compras = compras)
 
