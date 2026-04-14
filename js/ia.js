import { clasificarDocumento, generarResumen, generarBorrador } from "./api.js";

// Variable global para guardar el expediente seleccionado
let expedienteSeleccionado = null;


//  seleccionar expediente
export function seleccionarExpediente() {
    const select = document.getElementById("expedienteSelect");
    expedienteSeleccionado = select.value;

    console.log("Expediente seleccionado:", expedienteSeleccionado);
}


// Clasificar documento
export async function clasificar() {
    if (!expedienteSeleccionado) {
        alert("Selecciona un expediente primero");
        return;
    }

    try {
        const resultado = await clasificarDocumento(expedienteSeleccionado);

        // Mostrar tipo de caso en pantalla
        document.getElementById("resultadoClasificacion").textContent =
            resultado.tipo || "Sin resultado";

    } catch (error) {
        console.error("Error al clasificar:", error);
    }
}


//  Generar resumen
export async function resumir() {
    if (!expedienteSeleccionado) {
        alert("Selecciona un expediente primero");
        return;
    }

    try {
        const resumen = await generarResumen(expedienteSeleccionado);

        // Mostrar resumen en el textarea
        document.getElementById("resultadoResumen").value =
            resumen.texto || "No se pudo generar el resumen";

    } catch (error) {
        console.error("Error al generar resumen:", error);
    }
}


//  Descargar borrador
export async function descargarBorrador() {
    if (!expedienteSeleccionado) {
        alert("Selecciona un expediente primero");
        return;
    }

    try {
        const archivo = await generarBorrador(expedienteSeleccionado);

        // Crear archivo descargable
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
    }
}
