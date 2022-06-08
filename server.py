from flask import Flask, render_template, redirect, url_for, session, escape, request
import bcrypt
import data_handler as dh

app = Flask(__name__)
app.secret_key = 'scrtky'


@app.route('/')
def main():
    user = None
    try:
        user = session['user']
    finally:
        return render_template('index.html', user=user)


@app.route('/register', methods=['GET', 'POST'])
def register_user():
    if request.method == 'GET':
        return render_template("register.html")
    else:
        username = request.form['username']
        password = request.form['password']
        password2 = request.form['password2']
        if password == password2:
            password = hash_password(password)
            existing_user = dh.get_user(username)
            if existing_user:
                pass
            else:
                dh.add_user(username, password)
                session['user'] = username
                session['password'] = password
                return redirect(url_for('main'))


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template("login.html")
    else:
        username = request.form['username']
        password = request.form['password']
        user_password = dh.get_user(username)[0]["password"]
        if verify_password(password, user_password):
            session['user'] = username
            session['password'] = password
            return redirect(url_for('main'))


@app.route('/logout')
def logout():
    session.pop('user', 'password')
    return redirect(url_for('main'))


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
