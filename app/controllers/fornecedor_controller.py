from flask import Blueprint, request, redirect, url_for, render_template, flash
from app.models.fornecedor import *

fornecedor_bp = Blueprint("fornecedor", __name__)

@fornecedor_bp.route("/fornecedor/lista", methods=["GET"])
def listar_fornecedor():
    fornecedores = get_fornecedores()
    return render_template('fornecedor.html', fornecedores=fornecedores)


@fornecedor_bp.route("/fornecedor/cadastrar", methods=["POST"])
def cadastro_fornecedor():
    try:
        nome = request.form['nomeFornecedor']
        nome_fantasia = request.form['nome_fantasia']
        cnpj = request.form['cnpj']
        endereco = request.form['endereco']
        telefone1 = request.form['telefone1']
        telefone2 = request.form['telefone2']

        dados = {
            "nome": nome,
            "nome_fantasia": nome_fantasia,
            "cnpj": cnpj,
            "endereco": endereco,
            "telefone1": telefone1,
            "telefone2": telefone2
        }

        insert_fornecedor(dados)
        flash("✅ Fornecedor cadastrado com sucesso!", "success")
    except Exception as e:
        flash(f"❌ Erro ao cadastrar fornecedor: {str(e)}", "danger")

    return redirect(url_for('fornecedor.listar_fornecedor'))


@fornecedor_bp.route("/fornecedor/inativar", methods=["GET"])
def inativar_fornecedor():
    id = request.args.get('id')
    try:
        inativar(id)
        flash("🚫 Fornecedor inativado com sucesso!", "warning")
    except Exception as e:
        flash(f"❌ Erro ao inativar fornecedor: {str(e)}", "danger")

    return redirect(url_for('fornecedor.listar_fornecedor'))


@fornecedor_bp.route("/fornecedor/reativar", methods=["GET"])
def reativar_fornecedor():
    id = request.args.get('id')
    try:
        reativar(id)
        flash("✅ Fornecedor reativado com sucesso!", "success")
    except Exception as e:
        flash(f"❌ Erro ao reativar fornecedor: {str(e)}", "danger")

    return redirect(url_for('fornecedor.listar_fornecedor'))


@fornecedor_bp.route("/fornecedor/alterar", methods=["POST"])
def alterar_fornecedor():
    try:
        id = request.form['id']
        novoNome = request.form['novoNomeFornecedor']
        novoNomefantasia = request.form['novoNome_fantasia']
        novoCnpj = request.form['novoCnpj']
        novoEndereco = request.form['novoEndereco']
        novoTelefone1 = request.form['novoTelefone1']
        novoTelefone2 = request.form['novoTelefone2']

        alterar_fornecedor(id, novoNome, novoNomefantasia, novoCnpj, novoEndereco, novoTelefone1, novoTelefone2)
        flash("✏️ Fornecedor alterado com sucesso!", "info")
    except Exception as e:
        flash(f"❌ Erro ao alterar fornecedor: {str(e)}", "danger")

    return redirect(url_for('fornecedor.listar_fornecedor'))
