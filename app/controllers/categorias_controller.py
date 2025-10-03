from flask import Blueprint, request, render_template, redirect, url_for, flash
from app.models.categoria import *

categoria_bp = Blueprint("categoria", __name__)

@categoria_bp.route("/categoria/lista", methods=["GET"])
def listar_categorias():
    categorias = get_categorias()
    return render_template('categoria.html', categorias=categorias)


@categoria_bp.route("/categoria/cadastrar", methods=["POST"])
def criar_categoria():
    try:
        nome = request.form['nomeCategoria']
        descricao = request.form['descricaoCategoria']

        insert_categoria(nome, descricao)
        flash("✅ Categoria cadastrada com sucesso!", "success")
    except Exception as e:
        flash(f"❌ Erro ao cadastrar categoria: {str(e)}", "danger")

    return redirect(url_for('categoria.listar_categorias'))


@categoria_bp.route("/categoria/inativar", methods=["GET"])
def inativar_categoria():
    id = request.args.get('id')
    try:
        inativar(id)
        flash("🚫 Categoria inativada com sucesso!", "warning")
    except Exception as e:
        flash(f"❌ Erro ao inativar categoria: {str(e)}", "danger")

    return redirect(url_for('categoria.listar_categorias'))


@categoria_bp.route("/categoria/reativar", methods=["GET"])
def reativar_categoria():
    id = request.args.get('id')
    try:
        reativar(id)
        flash("✅ Categoria reativada com sucesso!", "success")
    except Exception as e:
        flash(f"❌ Erro ao reativar categoria: {str(e)}", "danger")

    return redirect(url_for('categoria.listar_categorias'))


@categoria_bp.route("/categoria/alterar", methods=["POST"])
def alterar_categoria():
    try:
        id = request.form['id']
        nome = request.form['nomeCategoria']
        descricao = request.form['descricaoCategoria']

        alterar(id, nome, descricao)
        flash("✏️ Categoria alterada com sucesso!", "info")
    except Exception as e:
        flash(f"❌ Erro ao alterar categoria: {str(e)}", "danger")

    return redirect(url_for('categoria.listar_categorias'))



