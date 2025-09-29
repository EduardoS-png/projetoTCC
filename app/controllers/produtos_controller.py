from flask import Blueprint, request, render_template, redirect, jsonify, url_for
from app.models.produto import get_produtos, get_produtos_id, get_produtos_inativos, insert_produtos, update_produto, inative_produto, reative_produto

produto_bp = Blueprint("produto", __name__)

@produto_bp.route("/produto/lista", methods=["GET"])
def listar_produtos():
    categoria_id = request.args.get("categoria", type=int)
    produtos = get_produtos(categoria_id)
    return render_template("produto.html", produtos= produtos)

@produto_bp.route("/api/produtos/inativos", methods=["GET"])
def buscar_produtos_inativos():
    try:
        produtos = get_produtos_inativos()
        return jsonify(produtos), 200
    except Exception as err:
        return jsonify({"erro": str(err)}), 400

@produto_bp.route("/api/produtos/<int:produto_id>", methods=["GET"])
def buscar_produto_id(produto_id):
    produto = get_produtos_id(produto_id)
    if produto:
        return jsonify(produto)
    return jsonify({"erro": "Produto não encontrado"}), 404


@produto_bp.route("/cadastrar", methods=["POST"])
def adicionar_produto():
    nome = request.form['nome']
    codigo_original = request.form['codigo_original']
    preco_base = request.form['preco_base']
    marca = request.form.get('marca')
    tamanho = request.form.get('tamanho')
    cor = request.form.get('cor')
    categoria_id = request.form['categoria_id']

    dados = {
        "nome": nome,
        "codigo_original": codigo_original,
        "preco_base": preco_base,
        "marca": marca,
        "tamanho": tamanho,
        "cor": cor,
        "categoria_id": categoria_id
    }

    insert_produtos(dados)
    return redirect(url_for('produto.listar_produtos'))


@produto_bp.route("/api/produtos/<int:produto_id>", methods=["PUT"])
def atualizar_produto(produto_id):
    try: 
        dados = request.get_json()
        if not dados:
            return jsonify({"erro": "JSON inválido ou vazio"}), 400
        
        existente = get_produtos_id(produto_id)
        if not existente:
            return jsonify({"erro": "Produto não encontrado"}), 404
        
        update_produto(produto_id, dados)
        return jsonify({"mensagem": "Produto atualizado com sucesso!"})
    except Exception as err:
        return jsonify({"erro": str(err)}), 400
    

@produto_bp.route("/api/produtos/<int:produto_id>", methods=["DELETE"])
def inativar_produto(produto_id):
    try:
        inative_produto(produto_id)
        return jsonify({"mensagem": "Produto inativado com sucesso!"}), 200
    except Exception as err:
        return jsonify({"erro": str(err)}), 400
    
@produto_bp.route("/api/produtos/reativar/<int:produto_id>", methods=["PUT"])
def reativar_produto(produto_id):
    try:
        reative_produto(produto_id)
        return jsonify({"mensagem": "Produto reativado com sucesso!"}), 200
    except Exception as e:
        return jsonify({"erro": str(e)}), 400