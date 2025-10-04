from app.models import conexaoBD
from flask import flash
from datetime import date

def get_compras_por_produto(produto_id):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor(dictionary=True)
        sql = """
            SELECT 
                co.id,
                co.nome_fornecedor,
                co.quantidade,
                co.preco_unitario,
                co.preco_compra,
                co.data_compra,
                f.id AS fornecedor_id,
                f.nome_fantasia AS fornecedor
            FROM compra co
            JOIN fornecedor f ON co.fornecedor_id = f.id
            WHERE co.produto_id = %s
            ORDER BY co.data_compra DESC
        """
        cursor.execute(sql, (produto_id,))
        compras = cursor.fetchall()
    finally:
        cursor.close()
        conexao.close()
    return compras


# Inserir nova compra
def inserir_compra(produto_id, nome_produto, fornecedor_id, nome_fornecedor, quantidade, preco_unitario, preco_compra):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor()

        cursor.execute("SELECT id, quantidade_total FROM produto WHERE id = %s", (produto_id,))
        produto = cursor.fetchone()
        if not produto:
            flash("Produto não encontrado.", "error")
            return False
            
        sql = """
            INSERT INTO compra (produto_id, nome_produto, fornecedor_id, nome_fornecedor, quantidade, preco_unitario, preco_compra, data_compra)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, NOW())
        """
        cursor.execute(sql, (produto_id, nome_produto, fornecedor_id, nome_fornecedor, quantidade, preco_unitario, preco_compra, date.today()))

        nova_quantidade = float(produto["quantidade_total"]) + quantidade
        cursor.execute("UPDATE produto SET quantidade_total = %s WHERE id = %s", (nova_quantidade, produto_id))
        conexao.commit()

        return {"sucesso": True, "mensagem": "Compra registrada e estoque atualizado com sucesso!"}
    except Exception as err:
        conexao.rollback()
        return {"sucesso": False, "mensagem": f"Erro ao registrar compra: {str(err)}"}
    finally:
        cursor.close()
        conexao.close()
