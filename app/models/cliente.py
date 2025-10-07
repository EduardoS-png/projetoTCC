from app.models import conexaoBD

# Listar todos os clientes
def get_clientes():
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor(dictionary=True)
        sql = "SELECT * FROM cliente ORDER BY nome"
        cursor.execute(sql)
        return cursor.fetchall()
    finally:
        cursor.close()
        conexao.close()

# Buscar cliente por ID
def get_cliente_por_id(cliente_id):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor(dictionary=True)
        sql = "SELECT * FROM cliente WHERE id = %s"
        cursor.execute(sql, (cliente_id,))
        return cursor.fetchone()
    finally:
        cursor.close()
        conexao.close()

# Inserir novo cliente
def insert_cliente(nome, cpf, telefone, endereco):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor()
        sql = "INSERT INTO cliente (nome, cpf, telefone, endereco) VALUES (%s, %s, %s, %s)"
        cursor.execute(sql, (nome, cpf, telefone, endereco))
        conexao.commit()
        return cursor.lastrowid
    finally:
        cursor.close()
        conexao.close()

# Alterar cliente existente
def alterar_cliente(cliente_id, nome, cpf, telefone, endereco):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor()
        sql = """
            UPDATE cliente
            SET nome = %s, cpf = %s, telefone = %s, endereco = %s
            WHERE id = %s
        """
        cursor.execute(sql, (nome, cpf, telefone, endereco, cliente_id))
        conexao.commit()
        return cursor.lastrowid
    finally:
        cursor.close()
        conexao.close()

# Deletar cliente
def deletar_cliente(cliente_id):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor()
        sql = "DELETE FROM cliente WHERE id = %s"
        cursor.execute(sql, (cliente_id,))
        conexao.commit()
    finally:
        cursor.close()
        conexao.close()
