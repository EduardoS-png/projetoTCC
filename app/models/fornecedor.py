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