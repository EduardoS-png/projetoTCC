from app.models import conexaoBD
from datetime import date

def get_produtos():
    conexao = conexaoBD()
    try: 
        cursor = conexao.cursor(dictionary=True)
        sql = """
            SELECT p.id,
            p.nome,
            c.id AS categoria_id, 
            c.nome AS categoria,
            f.id AS fornecedor_id,
            f.nome_fantasia AS fornecedor,
            p.codigo_original,
            p.marca,
            p.tamanho,
            p.cor, 
            p.data_cadastro,
            p.ativo
            FROM produto p
            JOIN categoria c ON p.categoria_id = c.id
            JOIN fornecedor f ON p.fornecedor_id = f.id
            ORDER BY p.nome
        """
        
        cursor.execute(sql)
        produtos = cursor.fetchall()
    finally:
        cursor.close()
        conexao.close()
    return produtos

def get_produtos_id(id):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor(dictionary=True)
        sql = """
            SELECT p.id, 
            p.nome, 
            p.codigo_original,
            p.marca, 
            p.tamanho, 
            p.cor, 
            p.data_cadastro, 
            p.ativo, 
            c.id AS categoria_id, 
            c.nome AS categoria, 
            f.id AS fornecedor_id,
            f.nome_fantasia AS fornecedor
            FROM produto p
            JOIN categoria c ON p.categoria_id = c.id
            JOIN fornecedor f ON p.fornecedor_id = f.id
            WHERE p.id = %s
        """

        cursor.execute(sql, (id,))
        produto = cursor.fetchone()
    finally:
        cursor.close()
        conexao.close()
    return produto

def insert_produtos(nome, codigo_original, marca, tamanho, cor, data_cadastro, categoria_id, fornecedor_id):
    conexao = conexaoBD()
    try: 
        cursor = conexao.cursor()
        if not data_cadastro:
            data_cadastro = date.today()

        sql = """
            INSERT INTO produto (nome, codigo_original, marca, tamanho, cor, data_cadastro, categoria_id, fornecedor_id)
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s)
        """

        cursor.execute(sql, (nome, codigo_original, marca, tamanho, cor, data_cadastro, categoria_id, fornecedor_id))
        produto_id = cursor.lastrowid
        conexao.commit()
        return produto_id
    finally:
        cursor.close()
        conexao.close()


def alterar(id, novoNome, novoCodigoOriginal, novaMarca, novoTamanho, novaCor, novaCategoria, novoFornecedor):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor()
        sql = """
            UPDATE produto
            SET nome = %s, codigo_original = %s, marca = %s, tamanho = %s, cor = %s, categoria_id = %s, fornecedor_id = %s
            WHERE id = %s
        """
        cursor.execute(sql, (novoNome, novoCodigoOriginal, novaMarca, novoTamanho, novaCor, novoFornecedor, novaCategoria, id))

        conexao.commit()
        return cursor.lastrowid
    finally:
        cursor.close()
        conexao.close()


def inativar(id):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor()
        sql = "UPDATE produto SET ativo = False WHERE id = %s"
        cursor.execute(sql, (id,))
        conexao.commit()
        return cursor.lastrowid
    finally:
        cursor.close()
        conexao.close()

def reativar(id):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor()
        sql = "UPDATE produto SET ativo = True WHERE id = %s"
        cursor.execute(sql, (id,))
        conexao.commit()
        return cursor.lastrowid
    finally:
        cursor.close()
        conexao.close()