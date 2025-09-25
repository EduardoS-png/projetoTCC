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
    
