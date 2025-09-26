from flask import Blueprint, request, jsonify
from datetime import datetime
from app.models.venda import conexaoBD, get_venda, get_venda_id, insert_venda, validar_venda

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
        

        cliente_nome = dados.get("cliente_nome")
        date_venda = dados.get("data_venda")
        forma_pagamento = dados.get("forma_pagamento")
        itens = dados.get("itens", [])

        if not all([cliente_nome, date_venda, forma_pagamento]) or not itens:
            return jsonify({"erro": "Campos obrigatórios faltando"}), 400

        conexao = conexaoBD()
        cursor = conexao.cursor(dictionary= True)

        # Validar estoque de cada item 
        for item in itens:
            cursor.execute("SELECT quantidade FROM estoque WHERE produto_id = %s", (item["produto_id"]))

            estoque = cursor.fetchone()
            if not estoque:
                return jsonify({"erro": f"Produto{item['nome_produto']} não encontrado"}), 404
            if estoque["quantidade"] < item["quantidade"]:
                return jsonify({"erro": f"Estoque insuficiente para {item['nome_produto']}"}), 400

        # Registrar vendas e atualizar estoque 
        for item in itens:
            cursor.execute(" UPDATE estoque SET quantidade = quantidade - %s WHERE produto_id = %s", (item["quantidade"], item["produto_id"]))

            cursor.execute(""" INSERT INTO venda (produto_id, produto_nome, cliente_nome, quantidade, preco_venda, data_venda, forma_pagamento) VALUES(%s,%s,%s,%s,%s,%s,%s)""",
                    (item["produto_id"],
                     item["nome_produto"],
                     cliente_nome, item["quantidade"],
                     item["preco_venda"],
                     datetime.strptime(date_venda, "%y-%m-%d"),
                     forma_pagamento
                    )
                ) 
        conexao.commit()
        return jsonify({"mensagem": "Venda(s) registrada(s) com sucesso!"}), 201
    except Exception as e:
        conexao.rollback()
        return jsonify({"erro": str(e)}), 500
    
    finally:
        cursor.close()
        conexao.close()

    

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
