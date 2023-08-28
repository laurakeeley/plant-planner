from server import create_app
import jwt

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)