from app.models import conexaoBD

def get_venda():
    conexao = conexaoBD()
    cursor = conexao.cursor(dictionary=True)
    cursor.execute("SELECT * FROM vendas")
    vendas = cursor.fetchall()
    cursor.close()
    conexao.close()
    return vendas


def get_venda_id(venda_id):
    conexao = conexaoBD()
    cursor = conexao.cursor(dictionary=True)
    cursor.execute("SELECT * FROM vendas WHERE id = %s", (venda_id,))
    venda = cursor.fetchone()
    cursor.close()
    conexao.close()
    return venda


def insert_venda(produto_id, nome_produto, cliente_id, quantidade, preco_venda, data_venda):
    conexao = conexaoBD()
    cursor = conexao.cursor()
    sql = """
        INSERT INTO vendas (produto_id, nome_produto, cliente_id, quantidade, preco_venda, data_venda)
        VALUES (%s, %s, %s, %s, %s, %s)
    """
    cursor.execute(sql, (produto_id, nome_produto, cliente_id, quantidade, preco_venda, data_venda))
    conexao.commit()
    venda_id = cursor.lastrowid
    cursor.close()
    conexao.close()
    return venda_id
