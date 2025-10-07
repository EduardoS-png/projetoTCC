from app.models import conexaoBD

def insert_item_venda(venda_id, produto_id, compra_id, quantidade, preco_unitario):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor()
        subtotal = float(quantidade) * float(preco_unitario)
        sql = """
            INSERT INTO venda_item (venda_id, produto_id, compra_id, quantidade, preco_unitario, subtotal)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        cursor.execute(sql, (venda_id, produto_id, compra_id, quantidade, preco_unitario, subtotal))
        conexao.commit()
        return cursor.lastrowid
    finally:
        cursor.close()
        conexao.close()


def get_itens_por_venda(venda_id):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor(dictionary=True)
        sql = """
            SELECT vi.*, p.nome AS produto_nome, c.id AS lote_id
            FROM venda_item vi
            JOIN produto p ON vi.produto_id = p.id
            JOIN compra c ON vi.compra_id = c.id
            WHERE vi.venda_id = %s
        """
        cursor.execute(sql, (venda_id,))
        return cursor.fetchall()
    finally:
        cursor.close()
        conexao.close()
