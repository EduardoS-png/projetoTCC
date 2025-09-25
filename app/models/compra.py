from app.models import conexaoBD
from datetime import date

def get_compra():
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor(dictionary=True)
        cursor.execute("SELECT * FROM compra")
        compras = cursor.fetchall()
    finally:
        cursor.close()
        conexao.close()
    return compras


def get_compra_id(compra_id):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor(dictionary=True)
        cursor.execute("SELECT * FROM compra WHERE id = %s", (compra_id,))
        compra = cursor.fetchone()
    finally:
        cursor.close()
        conexao.close()
    return compra


def insert_compra(dados: dict):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor()
        data_compra = dados.get('data_compra', date.today())
        
        cursor.execute("""
            INSERT INTO compra
            (produto_id, quantidade, preco_compra, cliente_id, data_compra)
            VALUES (%s, %s, %s, %s, %s)
        """, (
            dados['produto_id'],
            dados['quantidade'],
            dados['preco_compra'],
            dados.get('fornecedor_id'),
            data_compra
        ))
        
        compra_id = cursor.lastrowid

        cursor.execute("""
            UPDATE estoque
            SET quantidade = quantidade + %s
            WHERE produto_id = %s
        """, (dados['quantidade'], dados['produto_id']))

        conexao.commit()
        return compra_id
    finally:
        cursor.close()
        conexao.close()

def update_compra(compra_id, dados: dict):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor()
        campos = []
        valores = []

        mapa = {
            "nome": "nome",
            "tipo": "tipo",
            "codigo_original": "codigo_original",
            "preco_base": "preco_base",
            "marca": "marca",
            "tamanho": "tamanho",
            "cor": "cor",
            "data_cadastro": "data_cadastro"
        }

        for chave, coluna in mapa.items():
            if chave in dados:
                campos.append(f"{coluna}=%s")
                valores.append(dados[chave])

        if campos:
            sql = f"UPDATE produto SET {', '.join(campos)} WHERE id=%s"
            valores.append(compra_id)
            cursor.execute(sql, valores)

        conexao.commit()
    finally:
        cursor.close()
        conexao.close()