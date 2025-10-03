from flask import Blueprint, request, render_template, redirect, url_for, flash
from app.models.produto import *
from app.models.categoria import get_categorias
from app.models.fornecedor import get_fornecedores

produto_bp = Blueprint("produto", __name__)

@produto_bp.route("/produto/lista", methods=["GET"])
def listar_produtos():
    produtos = get_produtos()
    categorias = get_categorias()
    fornecedores = get_fornecedores()
    return render_template("produto.html", produtos=produtos, categorias=categorias, fornecedores=fornecedores)


@produto_bp.route("/produto/cadastrar", methods=["POST"])
def adicionar_produto():
    try:
        nome = request.form['nome']
        codigo_original = request.form['codigo_original']
        preco_base = float(request.form['preco_base'])
        marca = request.form.get('marca')
        tamanho = request.form.get('tamanho')
        cor = request.form.get('cor')
        categoria_id = int(request.form['categoria_id'])
        fornecedor_id = int(request.form['fornecedor_id'])
        data_cadastro = request.form.get('data_cadastro') or None

        insert_produtos(
            nome, codigo_original, preco_base, marca, tamanho, cor, data_cadastro, categoria_id, fornecedor_id
        )

        flash("✅ Produto cadastrado com sucesso!", "success")
    except Exception as e:
        flash(f"❌ Erro ao cadastrar produto: {str(e)}", "danger")

    return redirect(url_for('produto.listar_produtos'))


@produto_bp.route("/produto/alterar", methods=["POST"])
def atualizar_produto():
    try:
        id = int(request.form['id'])
        nome = request.form['nome']
        codigo_original = request.form['codigo_original']
        preco_base = float(request.form['preco_base'])
        marca = request.form.get('marca')
        tamanho = request.form.get('tamanho')
        cor = request.form.get('cor')
        categoria_id = int(request.form['categoria_id'])
        fornecedor_id = int(request.form['fornecedor_id'])
        status = int(request.form.get('ativo', 1)) 

        alterar(
            id, nome, codigo_original, preco_base, marca, tamanho, cor, categoria_id, fornecedor_id, status
        )

        flash("✏️ Produto atualizado com sucesso!", "info")
    except Exception as e:
        flash(f"❌ Erro ao atualizar produto: {str(e)}", "danger")

    return redirect(url_for('produto.listar_produtos'))


@produto_bp.route("/produto/inativar", methods=["GET"])
def inativar_produto():
    id = request.args.get('id')
    try:
        inativar(id)
        flash("🚫 Produto inativado!", "warning")
    except Exception as e:
        flash(f"❌ Erro ao inativar produto: {str(e)}", "danger")

    return redirect(url_for('produto.listar_produtos'))
    

@produto_bp.route("/produto/reativar", methods=["GET"])
def reativar_produto():
    id = request.args.get('id')
    try:
        reativar(id)
        flash("✅ Produto reativado com sucesso!", "success")
    except Exception as e:
        flash(f"❌ Erro ao reativar produto: {str(e)}", "danger")

    return redirect(url_for('produto.listar_produtos'))