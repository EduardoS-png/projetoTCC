from flask import Blueprint, request, jsonify
from app.models.compra import get_compra, get_compra_id, insert_compra

compra_bp = Blueprint("compra", __name__)

@compra_bp.route("/api/compra", methods=["GET"])
def listar_compras():
    try:
        compras = get_compra()
        return jsonify(compras), 200
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

@compra_bp.route("/api/compra/<int:compra_id>", methods=["GET"])
def buscar_compra_id(compra_id):
    try:
        compra = get_compra_id(compra_id)
        if compra:
            return jsonify(compra), 200
        return jsonify({"mensagem": "Compra não encontrada"}), 404
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

@compra_bp.route("/api/compra", methods=["POST"])
def criar_compra():
    try:
        dados = request.json
        compra_id = insert_compra(dados)
        return jsonify({"mensagem": "Compra registrada com sucesso", "id": compra_id}), 201
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

@compra_bp.route("/api/compra/<int:compra_id>", methods=["PUT"])
def atualizar_compra(compra_id):
    try: 
        dados = request.get_json()
        if not dados:
            return jsonify({"erro": "JSON inválido ou vazio"}), 400
        
        existente = get_compra_id(compra_id)
        if not existente:
            return jsonify({"erro": "Produto não encontrado"}), 404
        
        return jsonify({"mensagem": "Produto atualizado com sucesso!"})
    except Exception as err:
        return jsonify({"erro": str(err)}), 400
