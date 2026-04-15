import { clasificarDocumento, generarResumen, generarBorrador } from "./api.js";

// Variable global
let expedienteSeleccionado = null;


//  Seleccionar expediente
export function seleccionarExpediente() {
    const select = document.getElementById("expedienteSelect");
    expedienteSeleccionado = select.value;

    console.log("Expediente seleccionado:", expedienteSeleccionado);
}


//  SPINNER
function mostrarSpinner() {
    document.getElementById("spinner").style.display = "block";
    document.getElementById("overlaySpinner").style.display = "block";
}

function ocultarSpinner() {
    document.getElementById("spinner").style.display = "none";
    document.getElementById("overlaySpinner").style.display = "none";
}


//  Clasificar documento
export async function clasificar() {
    if (!expedienteSeleccionado) {
        alert("Selecciona un expediente primero");
        return;
    }

    try {
        mostrarSpinner();

        const resultado = await clasificarDocumento(expedienteSeleccionado);

        document.getElementById("resultadoClasificacion").textContent =
            resultado.tipo || "Sin resultado";

    } catch (error) {
        console.error("Error al clasificar:", error);
    } finally {
        ocultarSpinner();
    }
}


//  Generar resumen
export async function resumir() {
    if (!expedienteSeleccionado) {
        alert("Selecciona un expediente primero");
        return;
    }

    try {
        mostrarSpinner();

        const resumen = await generarResumen(expedienteSeleccionado);

        document.getElementById("resultadoResumen").value =
            resumen.texto || "No se pudo generar el resumen";

    } catch (error) {
        console.error("Error al generar resumen:", error);
    } finally {
        ocultarSpinner();
    }
}


//  Descargar borrador
export async function descargarBorrador() {
    if (!expedienteSeleccionado) {
        alert("Selecciona un expediente primero");
        return;
    }

    try {
        mostrarSpinner();

        const archivo = await generarBorrador(expedienteSeleccionado);

        const blob = new Blob([archivo], {
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        });

        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `borrador_${expedienteSeleccionado}.docx`;
        a.click();

        window.URL.revokeObjectURL(url);

    } catch (error) {
        console.error("Error al descargar borrador:", error);
    } finally {
        ocultarSpinner();
    }
}


//  INPUT FILE (cuando cargue la página)
window.addEventListener("DOMContentLoaded", () => {
    const inputArchivo = document.getElementById("inputArchivo");

    if (inputArchivo) {
        inputArchivo.addEventListener("change", function () {
            const archivo = inputArchivo.files[0];

            if (archivo) {
                document.getElementById("nombreArchivo").textContent = archivo.name;
            }
        });
    }
});


//  NECESARIO PARA HTML
window.seleccionarExpediente = seleccionarExpediente;
window.clasificar = clasificar;
window.resumir = resumir;
window.descargarBorrador = descargarBorrador;
}
