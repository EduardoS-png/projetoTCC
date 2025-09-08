from flask import Flask
from config import Config
from app.controllers.usuario_controller import usuario_bp
from app.controllers.tecido_controller import tecido_bp

app = Flask(__name__, static_folder="app/static")
app.secret_key = Config.SECRET_KEY

#Blueprints
app.register_blueprint(usuario_bp)
app.register_blueprint(tecido_bp)

if __name__ == "__main__":
  app.run(debug=True)




