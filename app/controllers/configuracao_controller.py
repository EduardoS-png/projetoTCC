from flask import Blueprint, request, render_template, redirect, url_for
from app.models.configuracao import *

configuracao_bp = Blueprint("configuracao", __name__)

@configuracao_bp.route("/configuracao/lista")
def listar_configuracoes():
    configuracoes = get_configuracao()
    return render_template("configuracoes.html", configuracoes=configuracoes)

@configuracao_bp.route("/configuracao/cadastrar", methods=["POST"])
def criar_configuracao():
    nome = request.form["nome"]
    email = request.form["email"]
    senha = request.form["senha"]
    status = request.form["status"]

    insert_configuracao(nome, email, senha, status)
    return redirect(url_for("configuracao.listar_configuracoes"))

@configuracao_bp.route("/configuracao/deletar")
def deletar_configuracao():
    id = request.args.get("id")
    delete(id)
    return redirect(url_for("configuracao.listar_configuracoes"))

@configuracao_bp.route("/configuracao/alterar", methods=["POST"])
def alterar_configuracao():
    id = request.form["id"]
    nome = request.form["nomeAlterar"]
    email = request.form["emailAlterar"]
    senha = request.form["senhaAlterar"]
    status = request.form["statusAlterar"]

    alterar(id, nome, email, senha, status)
    return redirect(url_for("configuracao.listar_configuracoes"))
