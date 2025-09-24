from app.controllers import conexaoBD
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/dados-vendas')
def dados_vendas():
    conexao = conexaoBD()
    cursor = conexao.cursor()


    # Somar valor vendido por semana no mês atual
    # Ajuste os nomes das colunas/tabelas para o seu banco 
    cursor.execute("""
        SELECT semana, SUM(valor_venda) as total
        FROM vendas
        WHERE MONTH(data_venda) = MONTH(CURDATE())
        GROUP BY semana 
        ORDER BY semana     
    """)

    resultados = cursor.fetchall()

    semanas = []
    totais = []
    for semana, total in resultados:
        semanas.append(f"Semana {semana}")
        totais.append(float(total))

    cursor.close()
    conexao.close()

    return jsonify({
        "labels": semanas,
        "dados": totais
    })    


if __name__ == '__main__':
    app.run(debug=True)