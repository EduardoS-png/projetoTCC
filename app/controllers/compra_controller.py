from flask import Blueprint, request, render_template, redirect, url_for
from app.models.compra import get_compra, insert_compras

compra_bp = Blueprint("compra", __name__)

@compra_bp.route("/compra", methods=["GET"])
def listar_compra():
        compra = get_compra()
        return render_template('compra.html', compra= compra)

@compra_bp.route("/cadastrar", methods=["POST"])
def cadastrar_compra(dados):
    produto_id = request.form['produto_id']
    nome_produto = request.form['nome_produto']
    fornecedor_id = request.form['fornecedor_id']
    nome_fornecedor = request.form['nome_fornecedor']
    quantidade = request.form['quantidade']
    preco_compra = request.form['preco_compra']
    data_compra = request.form['data_compra']
    categoria = request.form['categoria']

    dados = {
        "produto_id": produto_id,
        "nome_produto": nome_produto,
        "fornecedor_id": fornecedor_id,
        "nome_fornecedor": nome_fornecedor,
        "quantidade": quantidade,
        "preco_compra": preco_compra,
        "data_compra": data_compra,
        "categoria": categoria
    }


    insert_compras(dados)
    return redirect(url_for('compra.listar_compra'))

 
