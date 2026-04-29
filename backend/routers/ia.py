router = APIRouter()
from fastapi import APIRouter, UploadFile, File, HTTPException
from dotenv import load_dotenv
import os

load_dotenv()

router = APIRouter(
    prefix="/ia",
    tags=["IA"]
)

def extraer_texto(contenido: bytes, filename: str) -> str:
    ext = filename.lower().split(".")[-1]

    if ext == "txt":
        return contenido.decode("utf-8", errors="ignore")

    elif ext == "pdf":
        import fitz
        doc = fitz.open(stream=contenido, filetype="pdf")
        texto = ""
        for pagina in doc:
            texto += pagina.get_text()
        return texto

    elif ext in ["docx", "doc"]:
        from docx import Document
        import io
        doc = Document(io.BytesIO(contenido))
        return "\n".join([p.text for p in doc.paragraphs])

    elif ext in ["jpg", "jpeg", "png"]:
        from PIL import Image
        import io
        img = Image.open(io.BytesIO(contenido))
        return f"[Imagen recibida: {filename} - {img.size[0]}x{img.size[1]} px]"

    else:
        raise HTTPException(status_code=400, detail=f"Formato .{ext} no soportado")


@router.get("/ia-test")
def prueba_ia():
    return {"mensaje": "IA funcionando"}


@router.post("/resumir")
async def resumir_documento(archivo: UploadFile = File(...)):
    try:
        from google import genai

        client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

        contenido = await archivo.read()
        print(f"Archivo recibido: {archivo.filename}, tamaño: {len(contenido)} bytes")

        texto = extraer_texto(contenido, archivo.filename)
        print(f"Texto extraído: {len(texto)} caracteres")

        if not texto.strip():
            return {"archivo": archivo.filename, "resumen": "El documento está vacío o no se pudo leer el texto."}

        respuesta = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=f"Resume el siguiente documento jurídico de manera clara y profesional:\n\n{texto[:10000]}"
        )

        return {
            "archivo": archivo.filename,
            "resumen": respuesta.text
        }

    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"ERROR: {str(e)}")
        return {"error": str(e), "resumen": f"No se pudo generar el resumen: {str(e)}"}
