from flask import Blueprint, request, jsonify
from app.models.venda import venda , get_venda, get_venda_id, insert_venda

venda_bp = Blueprint("venda", __name__)

# Listar todas as vendas
@venda_bp.route("/api/vendas", methods=["GET"])
def listar_vendas():
    try:
        vendas = get_venda()
        return jsonify(venda), 200
    except Exception as e:
        return jsonify({"erro": str(e)}), 400
    

# Buscar venda por id
@venda_bp.route("/api/vendas/<int:venda_id>", methods=["GET"])
def buscar_venda(venda_id):
    try:
        resultado = get_venda_id(venda_id)
        if not resultado:
            return jsonify({"erro": "Venda não encontrada"}), 404
        return jsonify(resultado), 200
    except Exception as e:
        return jsonify({"erro": str(e)}), 400
    

# Registrar nova venda 
@venda_bp.route("/api/vendas", methods=["POST"])
def registrar_vendas():
    try:
        dados = request.get_json()
        if not dados:
            return jsonify({"erro": "JSON inválido ou vazio"}), 400
        

        produto_id = dados.get("produto_id")
        nome_produto = dados.get("nome_produto")
        cliente_id = dados.get("cliente_id")
        quantidade = dados.get("quantidade")
        preco_venda = dados.get("preco_venda")
        data_venda = dados.get("data_venda")

        if not all([produto_id, nome_produto, cliente_id, quantidade, preco_venda, data_venda]):
            return jsonify({"erro": "Campos obrigatórios faltando"}), 400

        venda_id = insert_venda(produto_id, nome_produto, cliente_id, quantidade, preco_venda, data_venda)

        return jsonify({"mensagem": "Venda registrada com sucesso!", "id": venda_id}), 201
    except Exception as e:
        return jsonify({"erro": str(e)}), 400