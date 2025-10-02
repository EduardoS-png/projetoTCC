from app.models import conexaoBD

def listar_compras_por_produto(produto_id):
    conexao = conexaoBD()
    cursor = conexao.cursor(dictionary=True)

    query = """
        SELECT id, produto_id, quantidade, valor_total, data
        FROM compras
        WHERE produto_id = %s
    """
    cursor.execute(query, (produto_id,))
    compras = cursor.fetchall()

    cursor.close()
    conexao.close()

    return compras

# Inserir nova compra
def inserir_compra(produto_id, quantidade, valor_total):
    conexao = conexaoBD()
    cursor = conexao.cursor()

    query = """
        INSERT INTO compras (produto_id, quantidade, valor_total)
        VALUES (%s, %s, %s)
    """
    cursor.execute(query, (produto_id, quantidade, valor_total))
    conexao.commit()

    cursor.close()
    conexao.close()

# Buscar uma compra pelo ID
def buscar_compra_por_id(compra_id):
    conexao = conexaoBD()
    cursor = conexaoBD.cursor(dictionary=True)

    query = "SELECT id, produto_id, quantidade, valor_total, data FROM compras WHERE id = %s"
    cursor.execute(query, (compra_id,))
    compra = cursor.fetchone()

    cursor.close()
    conexao.close()