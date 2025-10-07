from app.models import conexaoBD
from datetime import date, timedelta

def get_estoque_por_categoria():
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor(dictionary=True)
        sql = """
            SELECT 
                c.nome AS categoria,
                SUM(p.quantidade_total * COALESCE(com.preco_unitario, 0)) AS valor_estoque
            FROM produto p
            LEFT JOIN (
                SELECT produto_id, AVG(preco_unitario) AS preco_unitario
                FROM compra
                GROUP BY produto_id
            ) com ON p.id = com.produto_id
            LEFT JOIN categoria c ON p.categoria_id = c.id 
            GROUP BY c.nome
        """
        cursor.execute(sql)
        return cursor.fetchall()
    finally:
        conexao.close()


def get_top_produtos_estoque(limit=5):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor(dictionary=True)
        sql = f"""
            SELECT 
                p.nome AS produto,
                p.quantidade_total * COALESCE(com.preco_unitario, 0) AS valor_estoque
            FROM produto p
            LEFT JOIN (
                SELECT produto_id, AVG(preco_unitario) AS preco_unitario
                FROM compra
                GROUP BY produto_id
            ) com ON p.id = com.produto_id
            ORDER BY valor_estoque DESC
            LIMIT {limit}
        """
        cursor.execute(sql)
        return cursor.fetchall()
    finally:
        conexao.close()

def get_vendas_por_semana(weeks=4):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor(dictionary=True)
        
        # Data de hoje
        hoje = date.today()
        resultados = []

        for i in range(weeks-1, -1, -1):
            # Calcular início e fim da semana
            domingo = hoje - timedelta(days=hoje.weekday() + 1 + i*7)
            segunda = domingo - timedelta(days=6)
            
            sql = """
                SELECT COALESCE(SUM(valor_total), 0) AS total
                FROM venda
                WHERE data_venda BETWEEN %s AND %s
            """
            cursor.execute(sql, (segunda, domingo))
            total = cursor.fetchone()['total']

            # Formatar label da semana
            label = f"{segunda.strftime('%d/%m')} - {domingo.strftime('%d/%m')}"
            resultados.append({'semana': label, 'total': float(total)})

        return resultados
    finally:
        conexao.close()
