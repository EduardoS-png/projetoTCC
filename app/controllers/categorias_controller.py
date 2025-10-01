from flask import Blueprint, request, render_template, redirect, url_for
from app.models.categoria import  * 

categoria_bp = Blueprint("categoria", __name__)

@categoria_bp.route("/categoria/lista", methods=["GET"])
def listar_categorias():
    categorias = get_categorias()
    return render_template('categoria.html', categorias= categorias)

@categoria_bp.route("/categoria/cadastrar", methods=["POST"])
def criar_categoria():
    nome = request.form['nomeCategoria']
    descricao = request.form['descricaoCategoria']

    insert_categoria(nome, descricao)
    return redirect(url_for('categoria.listar_categorias'))


@categoria_bp.route("/categoria/inativar", methods=["GET"])
def inativar_categoria():
    id = request.args.get('id')

    inativar(id)
    return redirect(url_for('categoria.listar_categorias'))

@categoria_bp.route("/categoria/reativar", methods=["GET"])
def reativar_categoria():
    id = request.args.get('id')

    reativar(id)
    return redirect(url_for('categoria.listar_categorias'))

@categoria_bp.route("/categoria/alterar", methods=["POST"])
def alterar_categoria():
    id = request.form['id']
    nome = request.form['nomeCategoria']
    descricao = request.form['descricaoCategoria']

    insert_categoria(nome, descricao)
    return redirect(url_for('categoria.listar_categorias'))



