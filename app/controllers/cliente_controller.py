from flask import Blueprint, render_template, request, redirect, url_for, flash
from app.models.cliente import *

cliente_bp = Blueprint("cliente", __name__)

# Listar clientes
@cliente_bp.route("/cliente/lista")
def listar_clientes():
    clientes = get_clientes()
    return render_template("clientes.html", clientes=clientes)

# Cadastrar cliente
@cliente_bp.route("/cliente/cadastrar", methods=["POST"])
def cadastrar_cliente():
    nome = request.form.get("nome")
    cpf = request.form.get("cpf").replace(".", "").replace("-", "")
    telefone = request.form.get("telefone")
    endereco = request.form.get("endereco")

    if not nome or not cpf:
        flash("Nome e CPF são obrigatórios.", "erro")
        return redirect(url_for("cliente.listar_clientes"))

    insert_cliente(nome, cpf, telefone, endereco)
    flash("Cliente cadastrado com sucesso!", "sucesso")
    return redirect(url_for("vendas.listar_vendas"))

# Alterar cliente
@cliente_bp.route("/cliente/alterar/<int:cliente_id>", methods=["POST"])
def alterar_cliente_route(cliente_id):
    nome = request.form.get("nome")
    cpf = request.form.get("cpf")
    telefone = request.form.get("telefone")
    endereco = request.form.get("endereco")

    if not nome or not cpf:
        flash("Nome e CPF são obrigatórios.", "erro")
        return redirect(url_for("cliente.listar_clientes"))

    alterar_cliente(cliente_id, nome, cpf, telefone, endereco)
    flash("Cliente atualizado com sucesso!", "sucesso")
    return redirect(url_for("cliente.listar_clientes"))

# Deletar cliente
@cliente_bp.route("/cliente/deletar/<int:cliente_id>", methods=["POST"])
def deletar_cliente_route(cliente_id):
    deletar_cliente(cliente_id)
    flash("Cliente removido com sucesso!", "sucesso")
    return redirect(url_for("cliente.listar_clientes"))
