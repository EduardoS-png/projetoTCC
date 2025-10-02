from app.models import conexaoBD

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
                p.preco_base,
                p.data_cadastro,
                p.ativo,
                COALESCE(SUM(co.quantidade), 0) AS quantidade_total
            FROM produto p
            JOIN categoria c ON p.categoria_id = c.id
            JOIN fornecedor f ON p.fornecedor_id = f.id
            LEFT JOIN compra co ON co.produto_id = p.id
            GROUP BY 
                p.id, p.nome, c.id, c.nome, f.id, f.nome_fantasia,
                p.codigo_original, p.preco_base, p.marca, 
                p.tamanho, p.cor, p.data_cadastro, p.ativo
            ORDER BY p.nome
        """
        cursor.execute(sql)
        inventario = cursor.fetchall()
    finally:
        cursor.close()
        conexao.close()
    return inventario
