from app.models import conexaoBD

def get_fornecedores():
  conexao = conexaoBD()
  try:
    cursor = conexao.cursor(dictionary=True)
    cursor.execute("SELECT * FROM fornecedor")
    fornecedores = cursor.fetchall()
  finally:
    cursor.close()
    conexao.close()
  return fornecedores

def get_fornecedor_id(fornecedor_id):
  conexao = conexaoBD()
  try:
    cursor = conexao.cursor(dictionary=True)
    cursor.execute("SELECT * FROM fornecedor WHERE id = %s", (fornecedor_id,))
    fornecedor = cursor.fetchone()
  finally:
    cursor.close()
    conexao.close()
  return fornecedor

def insert_fornecedor(dados: dict):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor()
        
        cursor.execute("""
            INSERT INTO fornecedor
            (nome,nome_fantasia, cnpj, endereco, telefone1, telefone2)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (
            dados['nome'],
            dados['nome_fantasia'],
            dados['cnpj'],
            dados['endereco'],
            dados['telefone1'],
            dados['telefone2'],
        ))
        
        cadastro_fornecedor = cursor.lastrowid

        conexao.commit()
        return cadastro_fornecedor
    finally:
        cursor.close()
        conexao.close()
        
def inativar(id):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor()
        sql = "UPDATE fornecedor set ativo = False WHERE id = %s"
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
        sql = "UPDATE fornecedor set ativo = True WHERE id = %s"
        cursor.execute(sql, (id,))
        conexao.commit()
        return cursor.lastrowid
    finally:
        cursor.close()
        conexao.close()


def alterar(id, novoNome, novoNome_fantasia, novoCnpj, novoEndereco, novoTelefone1, novoTelefone2):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor()
        sql = """
            UPDATE fornecedor
            SET nome = %s,
                nome_fantasia = %s,
                cnpj = %s,
                endereco = %s,
                telefone1 = %s,
                telefone2 = %s,
            WHERE id = %s
        """
        cursor.execute(sql, (novoNome, novoNome_fantasia, novoCnpj, novoEndereco, novoTelefone1, novoTelefone2, id))
        conexao.commit()
        return cursor.lastrowid
    finally:
        cursor.close()
        conexao.close()

