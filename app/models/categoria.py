from app.models import conexaoBD
import unicodedata
import mysql.connector

def normalizar_texto(texto):
    return ''.join(
        categoria for categoria in unicodedata.normalize('NFD', texto)
        if unicodedata.category(categoria) != 'Mn'
    ).lower()

def categoria_existe(nome):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor()
        cursor.execute("SELECT nome FROM categoria")
        categorias = cursor.fetchall()

        nome_normalizado = normalizar_texto(nome)
        for (nome_existente,) in categorias:
            if normalizar_texto(nome_existente) == nome_normalizado:
                return True
        return False
    finally:
        cursor.close()
        conexao.close()

def get_categorias():
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor(dictionary=True)
        cursor.execute("SELECT id, nome, descricao, ativo FROM categoria ORDER BY nome")
        categorias = cursor.fetchall()
    finally:
        cursor.close()
        conexao.close()
    return categorias

def insert_categoria(nome, descricao=None):
    if categoria_existe(nome):
        raise ValueError(f"A categoria '{nome}' já existe.")

    conexao = conexaoBD()
    try:
        cursor = conexao.cursor()
        sql = "INSERT INTO categoria (nome, descricao) VALUES (%s, %s)"
        cursor.execute(sql, (nome, descricao))
        conexao.commit()
        return cursor.lastrowid
    except mysql.connector.errors.IntegrityError as e:
        if e.errno == 1062:
            raise ValueError(f"A categoria '{nome}' já existe (ou é muito semelhante).")
        else:
            raise
    finally:
        cursor.close()
        conexao.close()

def inativar(id):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor()
        sql = "UPDATE categoria set ativo = False WHERE id = %s"
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
        sql = "UPDATE categoria set ativo = True WHERE id = %s"
        cursor.execute(sql, (id,))
        conexao.commit()
        return cursor.lastrowid
    finally:
        cursor.close()
        conexao.close()

def alterar(id, novoNome, novaDescricao):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor()
        sql = "UPDATE categoria set nome = %s , descricao = %s WHERE id = %s"
        cursor.execute(sql, (novoNome, novaDescricao, id))
        conexao.commit()
        return cursor.lastrowid
    finally:
        cursor.close()
        conexao.close()


