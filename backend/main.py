from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def inicio():
    return {"status": "SIGJEP API funcionando"}
