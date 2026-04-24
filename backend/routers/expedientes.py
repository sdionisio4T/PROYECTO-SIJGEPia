from fastapi import APIRouter
from sqlalchemy import text
from database import SessionLocal

router = APIRouter()

from fastapi import APIRouter
from sqlalchemy import text
from database import SessionLocal

router = APIRouter()

@router.get("/expedientes")
def get_expedientes():
    db = SessionLocal()
    resultado = db.execute(text("SELECT * FROM expedientes")).fetchall()
    db.close()
    return [dict(fila._mapping) for fila in resultado]

@router.post("/expedientes")
def crear_expediente(datos: dict):
    db = SessionLocal()
    db.execute(
        text("INSERT INTO expedientes (id_caso, fecha_creacion) VALUES (:id_caso, NOW())"),
        {"id_caso": datos["id_caso"]}
    )
    db.commit()
    db.close()
    return {"status": "Expediente creado ✅"}

@router.put("/expedientes/{id}")
def editar_expediente(id: int, datos: dict):
    db = SessionLocal()
    db.execute(
        text("UPDATE expedientes SET id_caso = :id_caso WHERE id_expediente = :id"),
        {"id_caso": datos["id_caso"], "id": id}
    )
    db.commit()
    db.close()
    return {"status": "Expediente actualizado ✅"}

@router.delete("/expedientes/{id}")
def eliminar_expediente(id: int):
    db = SessionLocal()
    db.execute(
        text("DELETE FROM expedientes WHERE id_expediente = :id"),
        {"id": id}
    )
    db.commit()
    db.close()
    return {"status": "Expediente eliminado ✅"}