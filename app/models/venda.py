from app.models import conexaoBD
from datetime import date

def get_venda():
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor(dictionary=True)
        cursor.execute("SELECT * FROM venda")
        vendas = cursor.fetchall()
    finally:
        cursor.close()
        conexao.close()
    return vendas


def get_venda_id(venda_id):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor(dictionary=True)
        cursor.execute("SELECT * FROM venda WHERE id = %s", (venda_id,))
        venda = cursor.fetchone()
    finally:
        cursor.close()
        conexao.close()
    return venda


def insert_venda(dados: dict):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor()
        data_venda = dados.get('data_venda', date.today())
        
        cursor.execute("""
            INSERT INTO venda
            (produto_id, quantidade, preco_venda, cliente_id, data_venda)
            VALUES (%s, %s, %s, %s, %s)
        """, (
            dados['produto_id'],
            dados['quantidade'],
            dados['preco_venda'],
            dados.get('cliente_id'),
            data_venda
        ))
        
        venda_id = cursor.lastrowid

        cursor.execute("""
            UPDATE estoque
            SET quantidade = quantidade - %s
            WHERE produto_id = %s
        """, (dados['quantidade'], dados['produto_id']))

        conexao.commit()
        return venda_id
    finally:
        cursor.close()
        conexao.close()




def validar_venda(produto_id, quantidade_desejada):
    conexao = conexaoBD()
    cursor = conexao.cursor(dictionary=True)

    # 1. Verificar se o produto existe
    sql_produto = """
        SELECT produto_id, quantidade
        FROM produto
        JOIN estoque e ON produto_id = estoque.produto_id
        WHERE produto_id = %s
    """
    cursor.execute(sql_produto, (produto_id,))
    produto = cursor.fetchone()

    if not produto:
        return {"status": False, "mensagem": "Produto não encontrado."}

    # 2. Verificar se há estoque suficiente
    if produto['quantidade'] < quantidade_desejada:
        return {"status": False, "mensagem": "Quantidade insuficiente em estoque."}

    # 3. Se tudo OK, atualiza estoque
    nova_qtd = produto['quantidade'] - quantidade_desejada
    sql_update = "UPDATE estoque SET quantidade = %s WHERE produto_id = %s"
    cursor.execute(sql_update, (nova_qtd, produto_id))
    conexao.commit()

    return {"status": True, "mensagem": "Venda validada e estoque atualizado."}

    
