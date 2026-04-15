import { clasificarDocumento, generarResumen, generarBorrador } from "./api.js";

// 🔹 VARIABLES GLOBALES
let expedienteSeleccionado = null;
let archivoActual = null;
let listaArchivos = []; // 🔥 HISTORIAL


// 🔹 SELECCIONAR EXPEDIENTE
export function seleccionarExpediente() {
    const select = document.getElementById("expedienteSelect");
    expedienteSeleccionado = select.value;

    console.log("Expediente seleccionado:", expedienteSeleccionado);
}


// 🔹 SPINNER
function mostrarSpinner() {
    document.getElementById("spinner").style.display = "block";
    document.getElementById("overlaySpinner").style.display = "block";
}

function ocultarSpinner() {
    document.getElementById("spinner").style.display = "none";
    document.getElementById("overlaySpinner").style.display = "none";
}


// 🔹 RENDER LISTA EN PANTALLA
function renderizarArchivos() {
    const contenedor = document.getElementById("listaArchivos");

    if (!contenedor) return;

    contenedor.innerHTML = "";

    listaArchivos.forEach((archivo, index) => {
        const item = document.createElement("div");
        item.textContent = `${index + 1}. ${archivo.name}`;
        item.style.fontSize = "12px";
        item.style.padding = "5px";

        contenedor.appendChild(item);
    });
}


// 🔹 SUBIR ARCHIVO
window.addEventListener("DOMContentLoaded", () => {
    const inputArchivo = document.getElementById("inputArchivo");

    if (inputArchivo) {
        inputArchivo.addEventListener("change", async function () {
            const archivo = inputArchivo.files[0];

            if (!archivo) return;

            mostrarSpinner();

            await new Promise(resolve => setTimeout(resolve, 1500));

            archivoActual = archivo;

            // 🔥 GUARDAR EN HISTORIAL
            listaArchivos.push(archivo);

            document.getElementById("nombreArchivo").textContent = archivo.name;

            renderizarArchivos(); // 🔥 ACTUALIZA LISTA

            ocultarSpinner();

            console.log("Archivo cargado:", archivo);
        });
    }
});


// 🔹 CLASIFICAR (SIMULADO)
export async function clasificar() {
    if (!expedienteSeleccionado) {
        alert("Selecciona un expediente primero");
        return;
    }

    if (!archivoActual) {
        alert("Primero sube un archivo");
        return;
    }

    try {
        mostrarSpinner();

        await new Promise(r => setTimeout(r, 2000));

        document.getElementById("resultadoClasificacion").textContent = "Tutela";

    } catch (error) {
        console.error(error);
    } finally {
        ocultarSpinner();
    }
}


// 🔹 RESUMIR (SIMULADO)
export async function resumir() {
    if (!expedienteSeleccionado) {
        alert("Selecciona un expediente primero");
        return;
    }

    if (!archivoActual) {
        alert("Primero sube un archivo");
        return;
    }

    try {
        mostrarSpinner();

        await new Promise(r => setTimeout(r, 2000));

        document.getElementById("resultadoResumen").value =
            "El documento corresponde a una acción de tutela por posible vulneración de derechos fundamentales. Se recomienda revisión inmediata.";

    } catch (error) {
        console.error(error);
    } finally {
        ocultarSpinner();
    }
}


// 🔹 BORRADOR (SIMULADO)
export function descargarBorrador() {
    if (!archivoActual) {
        alert("Primero sube un archivo");
        return;
    }

    const contenido = `
    BORRADOR JURÍDICO

    Expediente: ${expedienteSeleccionado}

    Documento analizado: ${archivoActual.name}

    Se recomienda actuación inmediata.
    `;

    const blob = new Blob([contenido], { type: "application/msword" });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "borrador.doc";
    a.click();
}


// 🔹 CONECTAR CON HTML
window.seleccionarExpediente = seleccionarExpediente;
window.clasificar = clasificar;
window.resumir = resumir;
window.descargarBorrador = descargarBorrador;
