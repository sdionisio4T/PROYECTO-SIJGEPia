import pymysql
from dotenv import load_dotenv
import os

load_dotenv()

MYSQL_HOST = os.getenv("MYSQL_HOST")
MYSQL_PORT = os.getenv("MYSQL_PORT")
MYSQL_USER = os.getenv("MYSQL_USER")
MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD")
MYSQL_DB = os.getenv("MYSQL_DB")

def get_connection():
    return pymysql.connect(
        host=MYSQL_HOST,
        port=int(MYSQL_PORT),
        user=MYSQL_USER,
        password=MYSQL_PASSWORD,
        database=MYSQL_DB
    )

# Prueba de conexión y consulta - descomentar para probar
# if __name__ == "__main__":
#     conn = get_connection()
#     cursor = conn.cursor()
#     cursor.execute("SELECT * FROM usuarios")
#     datos = cursor.fetchall()
#     for fila in datos:
#         print(fila)
#     conn.close()