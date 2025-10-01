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
