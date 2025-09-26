from app.models import conexaoBD
from datetime import date

def get_produtos(categoria_id=None):
    conexao = conexaoBD()
    try: 
        cursor = conexao.cursor(dictionary=True)
        sql = """
            SELECT p.id, p.nome, c.id AS categoria_id, c.nome AS categoria, p.codigo_original, p.preco_base, p.marca, p.tamanho, p.cor, p.data_cadastro, e.quantidade
            FROM produto p
            JOIN estoque e ON p.id = e.produto_id
            JOIN categoria c ON p.categoria_id = c.id
            WHERE p.ativo = TRUE
        """

        parametro = []

        if categoria_id: 
            sql += " AND p.categoria_id = %s"
            parametro.append(categoria_id)
        
        cursor.execute(sql, tuple(parametro))
        produtos = cursor.fetchall()
    finally:
        cursor.close()
        conexao.close()
    return produtos

def get_produtos_inativos(categoria_id=None):
    conexao = conexaoBD()
    try: 
        cursor = conexao.cursor(dictionary=True)
        sql = """
            SELECT p.id, p.nome, c.id AS categoria_id, c.nome AS categoria, 
            p.codigo_original, p.preco_base, p.marca, p.tamanho, p.cor, 
            p.data_cadastro, e.quantidade
            FROM produto p
            JOIN estoque e ON p.id = e.produto_id
            JOIN categoria c ON p.categoria_id = c.id
            WHERE p.ativo = FALSE
        """

        parametro = []

        if categoria_id: 
            sql += " AND p.categoria_id = %s"
            parametro.append(categoria_id)
        
        cursor.execute(sql, tuple(parametro))
        produtos = cursor.fetchall()
    finally:
        cursor.close()
        conexao.close()
    return produtos

def get_produtos_id(produto_id):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor(dictionary=True)
        sql = """
            SELECT p.id, p.nome, c.id AS categoria_id, c.nome AS categoria, 
            p.codigo_original, p.preco_base, p.marca, p.tamanho, p.cor, 
            p.data_cadastro, e.quantidade
            FROM produto p
            JOIN estoque e ON p.id = e.produto_id
            JOIN categoria c ON p.categoria_id = c.id
            WHERE p.id = %s AND p.ativo = TRUE
        """

        cursor.execute(sql, (produto_id,))
        produto = cursor.fetchone()
    finally:
        cursor.close()
        conexao.close()
    return produto

def get_categorias():
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor(dictionary=True)
        cursor.execute("SELECT id, nome, descricao FROM categoria ORDER BY nome")
        categorias = cursor.fetchall()
    finally:
        cursor.close()
        conexao.close()
    return categorias

def insert_categoria(nome, descricao=None):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor()
        sql = "INSERT INTO categoria (nome, descricao) VALUES (%s, %s)"
        cursor.execute(sql, (nome, descricao))
        conexao.commit()
        return cursor.lastrowid
    finally:
        cursor.close()
        conexao.close()



def insert_produtos(dados: dict):
    conexao = conexaoBD()
    try: 
        cursor = conexao.cursor()
        data_cadastro = dados.get('data_cadastro', date.today())

        cursor.execute("""
            INSERT INTO produto 
            (nome, codigo_original, preco_base, marca, tamanho, cor, data_cadastro, categoria_id)
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s)
        """, (
            dados['nome'], 
            dados['tipo'], 
            dados.get('codigo_original'),
            dados['preco_base'], 
            dados.get('marca'),
            dados.get('tamanho'), 
            dados.get('cor'), 
            data_cadastro,
            dados['categoria_id']
        ))

        produto_id = cursor.lastrowid
        cursor.execute("INSERT INTO estoque (produto_id, quantidade) VALUES (%s, %s)", (produto_id, dados.get('quantidade_inicial', 0)))
        conexao.commit()
        return produto_id
    finally:
        cursor.close()
        conexao.close()


def update_produto(produto_id, dados: dict):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor()
        campos = []
        valores = []

        mapa = {
            "nome": "nome",
            "tipo": "tipo",
            "codigo_original": "codigo_original",
            "preco_base": "preco_base",
            "marca": "marca",
            "tamanho": "tamanho",
            "cor": "cor",
            "data_cadastro": "data_cadastro"
        }

        for chave, coluna in mapa.items():
            if chave in dados:
                campos.append(f"{coluna}=%s")
                valores.append(dados[chave])

        if campos:
            sql = f"UPDATE produto SET {', '.join(campos)} WHERE id=%s"
            valores.append(produto_id)
            cursor.execute(sql, valores)
    
        #atualiza o estoque se for preenchido
        if 'quantidade' in dados and dados['quantidade'] not in [None, ""]:
            cursor.execute("UPDATE estoque SET quantidade=%s WHERE produto_id=%s", (dados['quantidade'], produto_id))

        conexao.commit()
    finally:
        cursor.close()
        conexao.close()


def inative_produto(produto_id):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor()
        cursor.execute("UPDATE produto SET ativo = FALSE WHERE id = %s", (produto_id,))
        conexao.commit()
    finally:
        cursor.close()
        conexao.close()

def reative_produto(produto_id):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor()
        cursor.execute("UPDATE produto SET ativo = TRUE WHERE id = %s", (produto_id,))
        conexao.commit()
    finally:
        cursor.close()
        conexao.close()

def get_quantidade_total():
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor(dictionary=True)
        cursor.execute("SELECT SUM(quantidade) as total FROM estoque")
        resultado = cursor.fetchone()
    finally:
        cursor.close()
        conexao.close()
    return resultado["total"] if resultado["total"] else 0

def get_baixo_estoque(limite=30):
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor(dictionary=True)
        cursor.execute("SELECT COUNT(*) as baixo_estoque FROM estoque WHERE quantidade < %s AND quantidade > 0", (limite,))
        resultado = cursor.fetchone()
    finally:
        cursor.close()
        conexao.close()
    return resultado["baixo_estoque"] if resultado["baixo_estoque"] else 0

def get_sem_estoque():
    conexao = conexaoBD()
    try:
        cursor = conexao.cursor(dictionary=True)
        cursor.execute("SELECT COUNT(*) as sem_estoque FROM estoque WHERE quantidade = 0")
        resultado = cursor.fetchone()
    finally:
        cursor.close()
        conexao.close()
    return resultado["sem_estoque"] if resultado["sem_estoque"] else 0