from flask import Blueprint, request, jsonify
from app.models.venda import get_venda, get_venda_id, insert_venda, validar_venda

venda_bp = Blueprint("venda", __name__)

# Listar todas as vendas
@venda_bp.route("/api/venda", methods=["GET"])
def listar_vendas():
    try:
        vendas = get_venda()
        return jsonify(vendas), 200
    except Exception as e:
        return jsonify({"erro": str(e)}), 400
    

# Buscar venda por id
@venda_bp.route("/api/venda/<int:venda_id>", methods=["GET"])
def buscar_venda(venda_id):
    try:
        venda = get_venda_id(venda_id)
        if not venda:
            return jsonify({"erro": "Venda não encontrada"}), 404
        return jsonify(venda), 200
    except Exception as e:
        return jsonify({"erro": str(e)}), 400
    

# Registrar nova venda 
@venda_bp.route("/api/venda", methods=["POST"])
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
    

@venda_bp.route("/api/venda", methods=["POST"])
def validar_venda():
    try:
        dados = request.get_json() if request.is_json else request.form
        produto_id = int(dados.get('produto_id'))
        quantidade_desejada = int(dados.get('quantidade_desejada'))

        resultado = validar_venda(produto_id, quantidade_desejada)

        return jsonify(resultado), (200 if resultado['status'] else 400)
    
    except Exception as e:
        return jsonify({"status": False, "mensagem": f"Erro interno: {str(e)}"}), 500
