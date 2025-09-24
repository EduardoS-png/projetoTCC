from flask import Blueprint, request, jsonify, session, redirect, render_template
from app.models.usuario import get_usuario, get_usuario_id, verificar_usuario

usuario_bp = Blueprint("usuario", __name__)

# rotas de controle de usuário
@usuario_bp.route("/")
def home():
  if 'usuario' in session:
    return render_template("painelControle.html")
  else:
    return redirect("/login")
  
@usuario_bp.route("/login", methods=["GET"])
def login():
  if 'usuario' in session:
    return redirect("/painelPrincipal")
  return render_template("login.html")

@usuario_bp.route("/login", methods=["POST"])
def verificarLogin():
  data = request.get_json()
  login = data.get("usuario")
  senha = data.get("senha")
  estado = data.get("estado")

  user = verificar_usuario(login, senha, estado)
  
  if user:
    session["usuario"] = login
    session["usuario_id"] = user["id"]
    session["estado"] = estado
    return jsonify({"sucesso": True, "nome": user["nome"]})
  else:
    return jsonify({"sucesso": False, "mensagem": "Credenciais inválidas"}), 401
  
@usuario_bp.route("/painelPrincipal")
def painelPrincipal():
  if 'usuario' in session:
    return render_template("painelControle.html")
  else:
    return redirect("/login")
  
@usuario_bp.route("/logout", methods=["POST"])
def logout():
  session.clear()
  return jsonify({"sucesso": True})

# rotas de consumo da api
@usuario_bp.route("/api/usuario", methods=["GET"])
def buscar_usuario():
  usuario = get_usuario()

  if usuario:
    return jsonify(usuario)
  return jsonify({"erro": "Usuário não encontrado"}), 404

@usuario_bp.route("/api/usuario/<int:usuario_id>", methods=["GET"])
def buscar_usuario_id(usuario_id):
  usuario = get_usuario_id(usuario_id)

  if usuario:
    return jsonify(usuario)
  return jsonify({"erro": "Usuário não encontrado"}), 404

@usuario_bp.route("/api/usuarioLogado", methods=["GET"])
def usuario_logado():
  if "usuario_id" not in session:
    return jsonify({"erro": "Usuário não encontrado"}), 401
  
  usuario = get_usuario_id(session["usuario_id"])
  if usuario:
    return jsonify({"id": usuario["id"], "nome": usuario["nome"]})
  return jsonify({"erro": "Usuário não encontrado"}), 404