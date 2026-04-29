from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import datetime
import random

from database import get_db
from models.pqrs import PQRS

router = APIRouter()

class PQRSCreate(BaseModel):
    nombre_ciudadano: str
    correo: str
    tipo: str
    descripcion: str


@router.post("/pqrs")
def crear_pqrs(data: PQRSCreate, db: Session = Depends(get_db)):

    tipo = data.tipo.lower()

    tipos_validos = ["peticion", "queja", "reclamo", "sugerencia"]

    if tipo not in tipos_validos:
        raise HTTPException(status_code=400, detail="Tipo de PQRS inválido")

    numero_radicado = f"PQRS-{datetime.now().strftime('%Y%m%d%H%M%S')}-{random.randint(100,999)}"

    nueva_pqrs = PQRS(
        numero_radicado=numero_radicado,
        nombre_ciudadano=data.nombre_ciudadano,
        correo=data.correo,
        tipo=tipo,
        descripcion=data.descripcion,
        estado="recibido",
        id_caso=None
    )

    db.add(nueva_pqrs)
    db.commit()
    db.refresh(nueva_pqrs)

    return {
        "msg": "PQRS registrada correctamente",
        "numero_radicado": nueva_pqrs.numero_radicado
    }


@router.get("/pqrs")
def listar_pqrs(db: Session = Depends(get_db)):
    return db.query(PQRS).order_by(PQRS.id_pqrs.desc()).all()