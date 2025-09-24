from app.models import conexaoBD

def get_usuario():
  conexao = conexaoBD()
  try:
    cursor = conexao.cursor(dictionary=True)
    cursor.execute("SELECT * FROM usuario")
    usuario = cursor.fetchall()
  finally:
    cursor.close()
    conexao.close()
  return usuario

def get_usuario_id(usuario_id):
  conexao = conexaoBD()
  try:
    cursor = conexao.cursor(dictionary=True)
    cursor.execute("SELECT * FROM usuario WHERE id = %s", (usuario_id,))
    usuario = cursor.fetchone()
  finally:
    cursor.close()
    conexao.close()
  return usuario

def verificar_usuario(email, senha, status):
  conexao = conexaoBD()
  cursor = conexao.cursor(dictionary=True)
  cursor.execute("SELECT * FROM usuario WHERE email = %s AND senha = %s AND status = %s", (email, senha, status))
  usuario = cursor.fetchone()
  cursor.close()
  conexao.close()
  return usuario