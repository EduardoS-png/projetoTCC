from flask import Blueprint, render_template, request, flash, redirect, url_for
from datetime import date
from app.models.venda import insert_venda, get_vendas, get_venda_por_id, atualizar_valor_total, atualizar_quantidade_total
from app.models.venda_item import insert_item_venda, get_itens_por_venda
from app.models.produto import get_produtos
from app.models.cliente import get_clientes
from app.models.compra import get_lotes_disponiveis, atualizar_quantidade_lote

venda_bp = Blueprint("venda", __name__)

# Listar todas as vendas
@venda_bp.route("/venda/lista")
def listar_vendas():
    vendas = get_vendas()
    produtos = get_produtos()
    clientes = get_clientes()
    return render_template("venda.html" , vendas=vendas, clientes=clientes, produtos=produtos, date=date)


# Detalhar uma venda
@venda_bp.route("/venda/detalhes/<int:venda_id>")
def detalhes_venda(venda_id):
    venda = get_venda_por_id(venda_id)
    itens = get_itens_por_venda(venda_id)
    return render_template("detalhes.html", venda=venda, itens=itens)


# Cadastrar nova venda (via formulário)
@venda_bp.route("/venda/cadastrar", methods=["POST"])
def cadastrar_venda():
    try:
        cliente_id = request.form.get("cliente_id")
        data_venda = request.form.get("data_venda") or str(date.today())
        status = request.form.get("status") or "pendente"
        forma_pagamento = request.form.get("forma_pagamento") or "dinheiro"

        # Itens da venda
        produtos_ids = request.form.getlist("produto_id[]")
        lotes_ids = request.form.getlist("lote_id[]")
        quantidades = request.form.getlist("quantidade[]")

        if not cliente_id or not produtos_ids:
            flash("Cliente e produtos são obrigatórios.", "erro")
            return redirect(url_for("venda.listar_vendas"))

        # Validação preliminar: verificar estoque de todos os itens antes de inserir
        for i in range(len(produtos_ids)):
            produto_id = int(produtos_ids[i])
            lote_id = int(lotes_ids[i])
            quantidade = float(quantidades[i])

            lotes_disponiveis = get_lotes_disponiveis(produto_id)
            lote_info = next((l for l in lotes_disponiveis if l['lote_id'] == lote_id), None)
            if not lote_info:
                flash(f"❌ Lote {lote_id} não encontrado ou sem estoque.", "erro")
                return redirect(url_for("venda.listar_vendas"))

            quantidade_disponivel = float(lote_info['quantidade_disponivel'])
            if quantidade > quantidade_disponivel:
                flash(f"❌ Quantidade solicitada ({quantidade}) maior que estoque disponível ({quantidade_disponivel}) no lote {lote_id}.", "erro")
                return redirect(url_for("venda.listar_vendas"))

        # Todos os itens válidos: criar venda
        nova_venda_id = insert_venda(cliente_id, status, forma_pagamento, data_venda)
        valor_total = 0

        for i in range(len(produtos_ids)):
            produto_id = int(produtos_ids[i])
            lote_id = int(lotes_ids[i])
            quantidade = float(quantidades[i])

            lote_info = next(l for l in get_lotes_disponiveis(produto_id) if l['lote_id'] == lote_id)
            preco_unitario = float(lote_info['preco_unitario'])

            # Inserir item da venda
            insert_item_venda(nova_venda_id, produto_id, lote_id, quantidade, preco_unitario)
            valor_total += quantidade * preco_unitario

            # Atualizar estoque e produto
            atualizar_quantidade_lote(lote_id, quantidade)
            atualizar_quantidade_total(produto_id)

        # Atualizar valor total da venda
        atualizar_valor_total(nova_venda_id, valor_total)

        flash("✅ Venda registrada com sucesso!", "sucesso")
        return redirect(url_for("venda.detalhes_venda", venda_id=nova_venda_id))

    except ValueError as ve:
        flash(f"❌ Erro de conversão: {str(ve)}", "erro")
        return redirect(url_for("venda.listar_vendas"))
    except Exception as err:
        flash(f"❌ Erro ao cadastrar venda: {str(err)}", "erro")
        return redirect(url_for("venda.listar_vendas"))



# Listar lotes de um produto (fetch)
@venda_bp.route("/venda/lotes/<int:produto_id>")
def listar_lotes_produto(produto_id):
    lotes = get_lotes_disponiveis(produto_id)
    return {"lotes": lotes}
