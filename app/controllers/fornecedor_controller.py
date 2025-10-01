from flask import Blueprint, request, redirect, url_for, render_template
from app.models.fornecedor import *

fornecedor_bp = Blueprint("fornecedor", __name__)

@fornecedor_bp.route("/fornecedor/lista", methods=["GET"])
def listar_fornecedor():
  fornecedores = get_fornecedores()
  return render_template('fornecedor.html', fornecedores= fornecedores)

@fornecedor_bp.route("/cadastrar", methods=["POST"])
def cadastro_fornecedor():
  nome = request.form['nomeFornecedor']
  nome_fantasia = request.form['nome_fantasia']
  cnpj = request.form['cnpj']
  endereco = request.form('endereco')
  telefone1 = request.form['telefone1']
  telefone2 = request.form('telefone2')

  dados = {
    "nome": nome,
    "nome_fantasia": nome_fantasia,
    "cnpj": cnpj,
    "endereco": endereco,
    "telefone1": telefone1,
    "telefone2": telefone2
  }

  insert_fornecedor(dados)
  return redirect(url_for('fornecedor.listar_fornecedor'))