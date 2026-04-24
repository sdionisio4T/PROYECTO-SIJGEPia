from fastapi import APIRouter
from sqlalchemy import text
from database import SessionLocal

router = APIRouter()

# GET — listar todos
@router.get("/usuarios")
def get_usuarios():
    db = SessionLocal()
    resultado = db.execute(text("SELECT id_usuarios, nombre, email, rol, estado FROM usuarios")).fetchall()
    db.close()
    return [dict(fila._mapping) for fila in resultado]

# POST — crear uno
@router.post("/usuarios")
def crear_usuario(datos: dict):
    db = SessionLocal()
    db.execute(
        text("INSERT INTO usuarios (nombre, email, password, rol, estado) VALUES (:nombre, :email, :password, :rol, 'activo')"),
        {"nombre": datos["nombre"], "email": datos["email"], "password": datos["password"], "rol": datos["rol"]}
    )
    db.commit()
    db.close()
    return {"status": "Usuario creado ✅"}

# PUT — editar uno
@router.put("/usuarios/{id}")
def editar_usuario(id: int, datos: dict):
    db = SessionLocal()
    db.execute(
        text("UPDATE usuarios SET nombre = :nombre, rol = :rol WHERE id_usuarios = :id"),
        {"nombre": datos["nombre"], "rol": datos["rol"], "id": id}
    )
    db.commit()
    db.close()
    return {"status": "Usuario actualizado ✅"}

# DELETE — eliminar uno
@router.delete("/usuarios/{id}")
def eliminar_usuario(id: int):
    db = SessionLocal()
    db.execute(
        text("DELETE FROM usuarios WHERE id_usuarios = :id"),
        {"id": id}
    )
    db.commit()
    db.close()
    return {"status": "Usuario eliminado ✅"}

@router.get("/usuarios/{id}")
def get_usuario(id: int):
    db = SessionLocal()
    resultado = db.execute(
        text("SELECT id_usuarios, nombre, email, rol, estado FROM usuarios WHERE id_usuarios = :id"),
        {"id": id}
    ).fetchone()
    db.close()
    if not resultado:
        return {"error": "Usuario no encontrado"}
    return dict(resultado._mapping)