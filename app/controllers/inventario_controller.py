from flask import Blueprint, render_template
from app.models.inventario import get_inventario

inventario_bp = Blueprint("inventario", __name__)

@inventario_bp.route("/inventario/lista", methods=["GET"])
def listar_inventario():
    produtos = get_inventario()
    return render_template("inventario.html", produtos=produtos)
