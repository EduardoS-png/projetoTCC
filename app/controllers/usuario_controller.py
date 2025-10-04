from flask import Blueprint, request, jsonify, session, redirect, render_template, flash
from app.models.usuario import * 

usuario_bp = Blueprint("usuario", __name__)

@usuario_bp.route("/")
def home():
    if 'usuario' in session:
        return render_template("layout.html", usuario_nome=session["usuario_nome"])
    else:
        flash("🔒 Faça login para acessar o sistema", "warning")
        return redirect("/login")
  
@usuario_bp.route("/login", methods=["GET"])
def login():
    if 'usuario' in session:
        flash("✅ Você já está logado!", "info")
        return redirect("/inventario/lista")
    return render_template("login.html")

@usuario_bp.route("/login", methods=["POST"])
def verificarLogin():
    login = request.form.get("usuario")
    senha = request.form.get("senha")
    estado = request.form.get("estado")

    user = verificar_usuario(login, senha, estado)

    if user:
        session["usuario"] = login
        session["usuario_id"] = user["id"]
        session["usuario_nome"] = user["nome"]
        session["estado"] = estado
        flash(f"✅ Bem-vindo, {user['nome']}!", "success")
        return redirect("/inventario/lista")
    else:
        flash("❌ Credenciais inválidas", "danger")
        return render_template("login.html")

@usuario_bp.route("/painelPrincipal")
def painelPrincipal():
    if 'usuario' in session:
        return render_template("layout.html", usuario_nome= session["usuario_nome"])
    else:
        flash("🔒 Faça login para acessar o painel", "warning")
        return redirect("/login")

@usuario_bp.route("/logout", methods=["POST"])
def logout():
    usuario = session.get("usuario")
    session.clear()
    flash(f"✅ {usuario} deslogado com sucesso!", "success")
    return jsonify({"sucesso": True})
