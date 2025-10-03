from app.models import conexaoBD

def get_configuracao():
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor(dictionary=True)
        cursor.execute("SELECT id, nome, email, senha, status FROM usuario ORDER BY nome")
        usuarios = cursor.fetchall()
    finally:
        cursor.close()
        conexao.close()
    return usuarios

def insert_configuracao(nome, email, senha, status):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor()
        sql = "INSERT INTO usuario (nome, email, senha, status) VALUES (%s, %s, %s, %s)"
        cursor.execute(sql, (nome, email, senha, status))
        conexao.commit()
        return cursor.lastrowid
    finally:
        cursor.close()
        conexao.close()

def delete(id):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor()
        sql = "DELETE FROM usuario WHERE id = %s"
        cursor.execute(sql, (id,))
        conexao.commit()
        return cursor.lastrowid
    finally:
        cursor.close()
        conexao.close()

def alterar(id, novoNome, novoEmail, novaSenha, novoStatus):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor()
        sql = "UPDATE usuario SET nome = %s, email = %s, senha = %s, status = %s WHERE id = %s"
        cursor.execute(sql, (novoNome, novoEmail, novaSenha, novoStatus, id))
        conexao.commit()
        return cursor.rowcount
    finally:
        cursor.close()
        conexao.close()


