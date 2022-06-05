from data import connection
from psycopg2 import sql


@connection.connection_handler
def get_user(cursor, username):
    query = sql.SQL("""SELECT password FROM users WHERE username = %(username)s""")
    cursor.execute(query, {'username': username})
    return cursor.fetchall()


@connection.connection_handler
def add_user(cursor, username, password):
    query = sql.SQL("""INSERT INTO users(username, password) VALUES (%(username)s, %(password)s)""")
    cursor.execute(query, {'username': username, 'password': password})
