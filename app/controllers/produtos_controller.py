from flask import Blueprint, request, render_template, redirect, url_for
from app.models.produto import *

produto_bp = Blueprint("produto", __name__)

@produto_bp.route("/produto/lista", methods=["GET"])
def listar_produtos():
    produtos = get_produtos()
    return render_template("produto.html", produtos= produtos)

@produto_bp.route("/produto/cadastrar", methods=["POST"])
def adicionar_produto():
    nome = request.form['nome']
    codigo_original = request.form['codigo_original']
    preco_base = float(request.form['preco_base'])
    marca = request.form.get('marca')
    tamanho = request.form.get('tamanho')
    cor = request.form.get('cor')
    categoria_id = int(request.form['categoria_id'])
    quantidade_inicial = int(request.form.get('quantidade_inicial', 0))
    data_cadastro = request.form.get('data_cadastro') or None

    insert_produtos(nome, codigo_original, preco_base, marca, tamanho, cor, data_cadastro, categoria_id, quantidade_inicial)

    return redirect(url_for('produto.listar_produtos'))


@produto_bp.route("/produto/alterar", methods=["POST"])
def atualizar_produto():
    id = int(request.form['id'])
    nome = request.form['nome']
    codigo_original = request.form['codigo_original']
    preco_base = float(request.form['preco_base'])
    marca = request.form.get('marca')
    tamanho = request.form.get('tamanho')
    cor = request.form.get('cor')
    categoria_id = int(request.form['categoria_id'])
    quantidade_inicial = int(request.form.get('quantidade_inicial', 0))
    data_cadastro = request.form.get('data_cadastro') or None

    alterar(id, nome, codigo_original, preco_base, marca, tamanho, cor, categoria_id, quantidade_inicial, data_cadastro)
    return redirect(url_for('produto.listar_produtos'))

@produto_bp.route("/produto/inativar", methods=["GET"])
def inativar_produto():
    id = request.args.get('id')

    inativar(id)
    return redirect(url_for('produto.listar_produtos'))
    
@produto_bp.route("/produto/reativar", methods=["GET"])
def reativar_produto():
    id = request.args.get('id')

    reativar(id)
    return redirect(url_for('produto.listar_produtos'))