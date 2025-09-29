from flask import Blueprint, request, render_template, redirect, url_for
from app.models.produto import  get_categorias, insert_categoria

categoria_bp = Blueprint("categoria", __name__)

@categoria_bp.route("/categoria/lista", methods=["GET"])
def listar_categorias():
    categorias = get_categorias()
    return render_template('categoria.html', categorias= categorias)

@categoria_bp.route("/cadastrar", methods=["POST"])
def criar_categoria():
    nome = request.form['nome']
    descricao = request.form['descricao']

    insert_categoria(nome, descricao)
    return redirect(url_for('categoria.listar_categorias'))

