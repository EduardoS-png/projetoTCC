from flask import Blueprint, render_template
from app.models.inventario import get_inventario
from app.models.fornecedor import get_fornecedores

inventario_bp = Blueprint("inventario", __name__)

@inventario_bp.route("/inventario/lista", methods=["GET"])
def listar_inventario():
    produtos = get_inventario()
    fornecedores = get_fornecedores()
    return render_template("inventario.html", produtos=produtos, fornecedores= fornecedores)
