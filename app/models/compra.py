from app.models import conexaoBD

def get_compras_por_produto(produto_id):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor(dictionary=True)
        sql = """
            SELECT 
                co.id,
                co.quantidade,
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
def inserir_compra(produto_id, quantidade, valor_total):
    conexao = conexaoBD()
    cursor = conexao.cursor()

    query = """
        INSERT INTO compra (produto_id, quantidade, valor_total)
        VALUES (%s, %s, %s)
    """
    cursor.execute(query, (produto_id, quantidade, valor_total))
    conexao.commit()

    cursor.close()
    conexao.close()
