from flask import Blueprint, request, jsonify
from app.models.fornecedor import get_fornecedores, get_fornecedor_id

fornecedor_bp = Blueprint("fornecedor", __name__)

@fornecedor_bp.route("/api/fornecedor", methods=["GET"])
def listar_fornecedor():
  try:
    fornecedores = get_fornecedores()
    return jsonify(fornecedores), 200
  except Exception as e:
    return jsonify({"erro": str(e)}), 500

@fornecedor_bp.route("/api/fornecedor/<int:fornecedor_id>", methods=["GET"])
def buscar_fornecedor_id(fornecedor_id):
  try:
    fornecedor = get_fornecedor_id(fornecedor_id)
    if fornecedor:
      return jsonify(fornecedor), 200
    return jsonify({"mensagem": "Compra não encontrada"}), 404
  except Exception as e:
    return jsonify({"erro": str(e)}), 500
