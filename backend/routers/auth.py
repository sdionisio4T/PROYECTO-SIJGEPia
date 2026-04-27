from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models.user import User
from pydantic import BaseModel
import bcrypt

router = APIRouter()

class UserCreate(BaseModel):
    nombre: str
    email: str
    password: str
    rol: str

class UserLogin(BaseModel):
    email: str
    password: str


# REGISTRO
@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):

    usuario_existente = db.query(User).filter(User.email == user.email).first()
    if usuario_existente:
        return {"error": "El usuario ya existe"}

    password_hash = bcrypt.hashpw(user.password.encode(), bcrypt.gensalt()).decode()

    nuevo_usuario = User(
        nombre=user.nombre,
        email=user.email,
        password=password_hash,
        rol=user.rol.lower(),   # 👈 importante
        estado="activo"
    )

    db.add(nuevo_usuario)
    db.commit()

    return {"msg": "Usuario registrado correctamente"}


# LOGIN
@router.post("/login")
def login(data: UserLogin, db: Session = Depends(get_db)):

    usuario = db.query(User).filter(User.email == data.email).first()

    if not usuario:
        return {"error": "Usuario no existe"}

    if not bcrypt.checkpw(data.password.encode(), usuario.password.encode()):
        return {"error": "Contraseña incorrecta"}

    return {
        "msg": "Login exitoso",
        "rol": usuario.rol
    }