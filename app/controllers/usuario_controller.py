from flask import Blueprint, request, redirect, render_template, flash, session
from app.models.usuario import verificar_usuario

usuario_bp = Blueprint("usuario", __name__)

# Página inicial
@usuario_bp.route("/")
def home():
    if 'usuario' in session:
        return render_template("layout.html", usuario_nome=session["usuario_nome"])
    else:
        flash("🔒 Faça login para acessar o sistema", "warning")
        return redirect("/login")

# Página de login (GET)
@usuario_bp.route("/login", methods=["GET"])
def login():
    if 'usuario' in session:
        flash("✅ Você já está logado!", "info")
        # Redireciona para a página correta com base no tipo de usuário
        if session.get("estado") == "Administrador":
            return redirect("/dashboard/lista")
        else:
            return redirect("/venda/lista")
    return render_template("login.html")

# Verificação do login (POST)
@usuario_bp.route("/login", methods=["POST"])
def verificarLogin():
    login = request.form.get("usuario")
    senha = request.form.get("senha")
    estado = request.form.get("estado")

    user = verificar_usuario(login, senha, estado)

    if user:
        # Cria sessão
        session["usuario"] = login
        session["usuario_id"] = user["id"]
        session["usuario_nome"] = user["nome"]
        session["estado"] = estado

        flash(f"✅ Bem-vindo, {user['nome']}!", "success")

        # Redireciona de acordo com o tipo de usuário
        if estado == "Administrador":
            return redirect("/dashboard/lista")
        else:
            return redirect("/venda/lista")
    else:
        flash("❌ Credenciais inválidas", "danger")
        return render_template("login.html")

# Painel principal (apenas para usuários logados)
@usuario_bp.route("/painelPrincipal")
def painelPrincipal():
    if 'usuario' in session:
        return render_template("layout.html", usuario_nome=session["usuario_nome"])
    else:
        flash("🔒 Faça login para acessar o painel", "warning")
        return redirect("/login")

# Logout
@usuario_bp.route("/logout", methods=["POST"])
def logout():
    usuario_nome = session.get("usuario_nome")
    session.clear()
    flash(f"✅ {usuario_nome} deslogado com sucesso!", "success")
    return redirect("/login")
