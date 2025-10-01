from flask import Flask
from config import Config
from app.controllers.usuario_controller import usuario_bp
from app.controllers.produtos_controller import produto_bp
from app.controllers.compra_controller import compra_bp
from app.controllers.fornecedor_controller import fornecedor_bp
from app.controllers.categorias_controller import categoria_bp

app = Flask(__name__, static_folder="app/static")
app.secret_key = Config.SECRET_KEY

#Blueprints
app.register_blueprint(usuario_bp)
app.register_blueprint(produto_bp)
app.register_blueprint(compra_bp)
app.register_blueprint(fornecedor_bp)
app.register_blueprint(categoria_bp)

if __name__ == "__main__":
  app.run(debug=True)




