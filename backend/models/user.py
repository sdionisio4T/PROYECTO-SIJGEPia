from sqlalchemy import Column, Integer, String, Enum
from database import Base

class User(Base):
    __tablename__ = "usuarios"

    id_usuarios = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(120))
    email = Column(String(120), unique=True, index=True)
    password = Column(String(255))
    rol = Column(String(50))
    estado = Column(String(20))