from flask import Blueprint, request, render_template, redirect, url_for
from app.models.configuracao import *   # importa as funções do seu model

configuracao_bp = Blueprint("configuracao", __name__)

# Rota para listar as configurações
@configuracao_bp.route("/configuracao/lista", methods=["GET"])
def listar_configuracoes():
    configuracoes = get_configuracao()
    return render_template("configuracao.html", configuracoes=configuracoes)


# Rota para cadastrar uma nova configuração
@configuracao_bp.route("/configuracao/cadastrar", methods=["POST"])
def criar_configuracao():
    nome = request.form['nomeConfiguracao']
    email = request.form['emailConfiguracao']
    senha = request.form['senhaConfiguracao']
    status = request.form['statusConfiguracao']

    insert_configuracao(nome, email, senha, status)
    return redirect(url_for("configuracao.listar_configuracoes"))


# Rota para deletar configuração
@configuracao_bp.route("/configuracao/deletar", methods=["GET"])
def deletar_configuracao():
    id = request.args.get("id")
    delete(id)
    return redirect(url_for("configuracao.listar_configuracoes"))


# Rota para alterar dados da configuração
@configuracao_bp.route("/configuracao/alterar", methods=["POST"])
def alterar_configuracao():
    id = request.form["id"]
    nome = request.form["nomeConfiguracao"]
    email = request.form["emailConfiguracao"]
    senha = request.form["senhaConfiguracao"]
    status = request.form["statusConfiguracao"]

    alterar(id, nome, email, senha, status)
    return redirect(url_for("configuracao.listar_configuracoes"))
