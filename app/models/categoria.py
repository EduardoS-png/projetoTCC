from app.models import conexaoBD

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
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor()
        sql = "INSERT INTO categoria (nome, descricao) VALUES (%s, %s)"
        cursor.execute(sql, (nome, descricao))
        conexao.commit()
        return cursor.lastrowid
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

def alterar(id, novoNome, novaDescricao, novoStatus):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor()
        sql = "UPDATE categoria set nome = %s , descricao = %s ,ativo = %s WHERE id = %s"
        cursor.execute(sql, (novoNome, novaDescricao, novoStatus, id))
        conexao.commit()
        return cursor.lastrowid
    finally:
        cursor.close()
        conexao.close()


