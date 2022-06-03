from flask import Flask, render_template, redirect, url_for, session, escape, request
import bcrypt
from data import data_handler as dh

app = Flask(__name__)


@app.route('/')
def main():
    return render_template('index.html')


@app.route('/register', methods=['GET', 'POST'])
def register_user():
    return render_template("register.html")


@app.route('/login', methods=['GET', 'POST'])
def login():
    return render_template("login.html")


@app.route('/logout')
def logout():
    return redirect("index.html")


def hash_password(plain_text_password):
    hashed_bytes = bcrypt.hashpw(plain_text_password.encode('utf-8'), bcrypt.gensalt())
    return hashed_bytes.decode('utf-8')


def verify_password(plain_text_password, hashed_password):
    hashed_bytes_password = hashed_password.encode('utf-8')
    return bcrypt.checkpw(plain_text_password.encode('utf-8'), hashed_bytes_password)


if __name__ == "__main__":
    app.run(
        debug=True,
        port=5000
    )
