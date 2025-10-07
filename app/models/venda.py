from app.models import conexaoBD
from datetime import date

def insert_venda(cliente_id, data_venda=None, usuario_id=1):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor()
        if not data_venda:
            data_venda = date.today()

        sql = """
            INSERT INTO venda (cliente_id, data_venda, valor_total, status, forma_pagamento, usuario_id)
            VALUES (%s, %s, 0, 'pendente', 'dinheiro', %s)
        """
        cursor.execute(sql, (cliente_id, data_venda, usuario_id))
        conexao.commit()
        return cursor.lastrowid
    finally:
        cursor.close()
        conexao.close()


def get_vendas():
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor(dictionary=True)
        sql = sql = """
        SELECT v.id, c.nome AS cliente_nome, v.data_venda, v.valor_total
        FROM venda v
        JOIN cliente c ON v.cliente_id = c.id
        ORDER BY v.data_venda DESC
        """
        cursor.execute(sql)
        return cursor.fetchall()
    finally:
        cursor.close()
        conexao.close()


def get_venda_por_id(venda_id):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor(dictionary=True)
        sql = """
            SELECT v.*, c.nome AS cliente_nome
            FROM venda v
            JOIN cliente c ON v.cliente_id = c.id
            WHERE v.id = %s
        """
        cursor.execute(sql, (venda_id,))
        return cursor.fetchone()
    finally:
        cursor.close()
        conexao.close()


def atualizar_valor_total(venda_id, valor_total):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor()
        sql = "UPDATE venda SET valor_total = %s WHERE id = %s"
        cursor.execute(sql, (valor_total, venda_id))
        conexao.commit()
    finally:
        cursor.close()
        conexao.close()

def atualizar_quantidade_total(produto_id):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor()
        sql = """
            UPDATE produto p
            SET p.quantidade_total = (
                SELECT IFNULL(SUM(l.quantidade_atual), 0)
                FROM lote l
                WHERE l.produto_id = p.id
            )
            WHERE p.id = %s
        """
        cursor.execute(sql, (produto_id,))
        conexao.commit()
    finally:
        cursor.close()
        conexao.close()


