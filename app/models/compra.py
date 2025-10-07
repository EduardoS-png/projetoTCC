from app.models import conexaoBD
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
def inserir_compra(produto_id, nome_produto, fornecedor_id, nome_fornecedor, quantidade, preco_unitario, preco_compra, data_compra=None):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor(dictionary=True)

        data_compra = data_compra or date.today().isoformat()

        # Verifica se o produto existe
        cursor.execute("SELECT id, quantidade_total FROM produto WHERE id = %s", (produto_id,))
        produto = cursor.fetchone()
        if not produto:
            raise ValueError("Produto não encontrado.")

        # Inserir compra
        sql = """
        INSERT INTO compra 
        (produto_id, nome_produto, fornecedor_id, nome_fornecedor, quantidade, preco_unitario, preco_compra, data_compra)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(sql, (
            produto_id,
            nome_produto,
            fornecedor_id,
            nome_fornecedor,
            quantidade,
            preco_unitario,
            preco_compra,
            data_compra
        ))

        sql_lote = """
            INSERT INTO lote (produto_id, fornecedor_id, quantidade_atual, preco_unitario, data_entrada)
            VALUES (%s, %s, %s, %s, %s)
        """
        cursor.execute(sql_lote, (produto_id, fornecedor_id, quantidade, preco_unitario, data_compra))

        # Atualiza estoque
        quantidade_atual = produto["quantidade_total"] or 0
        nova_quantidade = float(quantidade_atual) + quantidade
        cursor.execute("UPDATE produto SET quantidade_total = %s WHERE id = %s", (nova_quantidade, produto_id))

        conexao.commit()
        return {"sucesso": True, "mensagem": "Compra registrada e estoque atualizado com sucesso!"}

    except Exception as err:
        conexao.rollback()
        raise err
    finally:
        cursor.close()
        conexao.close()

def get_total_compras_hoje():
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor(dictionary=True)
        sql = """
            SELECT COALESCE(SUM(preco_compra), 0) AS total
            FROM compra
            WHERE data_compra = %s
        """
        cursor.execute(sql, (date.today(),))
        return cursor.fetchone()["total"]
    finally:
        conexao.close()

def get_lotes_disponiveis(produto_id):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor(dictionary=True)
        sql = """
            SELECT 
                l.id AS lote_id,
                l.preco_unitario,
                l.quantidade_atual,
                l.data_entrada
            FROM lote l
            WHERE l.produto_id = %s
            AND l.quantidade_atual > 0
            ORDER BY l.data_entrada ASC
        """
        cursor.execute(sql, (produto_id,))
        return cursor.fetchall()
    finally:
        cursor.close()
        conexao.close()

def atualizar_quantidade_lote(lote_id, quantidade_vendida):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor()
        sql = """
            UPDATE lote
            SET quantidade_atual = quantidade_atual - %s
            WHERE id = %s AND quantidade_atual >= %s
        """
        cursor.execute(sql, (quantidade_vendida, lote_id, quantidade_vendida))
        conexao.commit()
    finally:
        cursor.close()
        conexao.close()


