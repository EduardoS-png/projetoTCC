from app.models import conexaoBD
from datetime import date

def get_inventario():
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor(dictionary=True)
        sql = """
            SELECT 
                p.id,
                p.nome,
                c.id AS categoria_id,
                c.nome AS categoria,
                f.id AS fornecedor_id,
                f.nome_fantasia AS fornecedor,
                p.codigo_original,
                p.data_cadastro,
                p.ativo,
                COALESCE(SUM(co.quantidade), 0) AS quantidade_total
            FROM produto p
            JOIN categoria c ON p.categoria_id = c.id
            JOIN fornecedor f ON p.fornecedor_id = f.id
            LEFT JOIN compra co ON co.produto_id = p.id
            GROUP BY 
                p.id, p.nome, c.id, c.nome, f.id, 
                f.nome_fantasia, p.codigo_original, p.marca, 
                p.tamanho, p.cor, p.data_cadastro, p.ativo
            ORDER BY p.nome
        """
        cursor.execute(sql)
        inventario = cursor.fetchall()
    finally:
        cursor.close()
        conexao.close()
    return inventario

def get_valor_total_estoque():
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor(dictionary=True)
        sql = """
            SELECT 
                ROUND(SUM(p.quantidade_total * COALESCE(precos.preco_medio, 0)), 2) AS valor_total_estoque
            FROM produto p
            LEFT JOIN (
                SELECT 
                    produto_id, 
                    AVG(preco_unitario) AS preco_medio
                FROM compra
                GROUP BY produto_id
            ) AS precos ON p.id = precos.produto_id;
        """
        cursor.execute(sql)
        resultado = cursor.fetchone()
        return resultado["valor_total_estoque"] or 0
    except Exception as e:
        print("Erro ao calcular valor total do estoque:", e)
        return 0
    finally:
        conexao.close()
