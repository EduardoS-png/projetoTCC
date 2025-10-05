from app.models import conexaoBD
from datetime import date

def get_estoque_por_categoria():
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor(dictionary=True)
        sql = """
            SELECT 
                c.nome AS categoria,
                SUM(p.quantidade_total * COALESCE(com.preco_unitario, 0)) AS valor_estoque
            FROM produto p
            LEFT JOIN (
                SELECT produto_id, AVG(preco_unitario) AS preco_unitario
                FROM compra
                GROUP BY produto_id
            ) com ON p.id = com.produto_id
            LEFT JOIN categoria c ON p.categoria_id = c.id 
            GROUP BY c.nome
        """
        cursor.execute(sql)
        return cursor.fetchall()
    finally:
        conexao.close()


def get_top_produtos_estoque(limit=5):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor(dictionary=True)
        sql = f"""
            SELECT 
                p.nome AS produto,
                p.quantidade_total * COALESCE(com.preco_unitario, 0) AS valor_estoque
            FROM produto p
            LEFT JOIN (
                SELECT produto_id, AVG(preco_unitario) AS preco_unitario
                FROM compra
                GROUP BY produto_id
            ) com ON p.id = com.produto_id
            ORDER BY valor_estoque DESC
            LIMIT {limit}
        """
        cursor.execute(sql)
        return cursor.fetchall()
    finally:
        conexao.close()

def get_produtos_por_fornecedor(limit=5):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor(dictionary=True)
        sql = f"""
            SELECT f.nome_fantasia AS fornecedor,
                  COUNT(p.id) AS quantidade_produtos
            FROM fornecedor f
            LEFT JOIN produto p ON f.id = p.fornecedor_id
            WHERE f.ativo = 1
            GROUP BY f.nome_fantasia
            ORDER BY quantidade_produtos DESC
            LIMIT {limit}
        """
        cursor.execute(sql)
        return cursor.fetchall()
    finally:
        conexao.close()
