const BACKEND_URL = "https://didactic-acorn-97p6p6x969wp39vwv-8000.app.github.dev";

// CARGAR TARJETAS DESDE EL BACKEND
async function cargarResumen() {
    try {
        const respuesta = await fetch(BACKEND_URL + "/reportes/resumen");
        const data = await respuesta.json();

        document.getElementById("totalCasos").textContent = data.total_casos || 0;
        document.getElementById("totalAlertas").textContent = data.total_resumenes_ia || 0;
        document.getElementById("totalVencidos").textContent = 0;

    } catch (error) {
        console.error("Error cargando resumen:", error);
    }
}

// GENERAR REPORTE DESDE EL BACKEND
async function generarReporte() {
    try {
        const respuesta = await fetch(BACKEND_URL + "/reportes/casos-por-estado");
        const datos = await respuesta.json();
        renderTabla(datos);
    } catch (error) {
        console.error("Error generando reporte:", error);
    }
}

// RENDER TABLA
function renderTabla(lista) {
    const tabla = document.getElementById("tablaReportes");
    tabla.innerHTML = "";

    if (!lista.length) {
        tabla.innerHTML = `<tr><td colspan="4">No hay datos disponibles</td></tr>`;
        return;
    }

    lista.forEach(d => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>-</td>
            <td>-</td>
            <td class="${getClaseEstado(d.estado)}">${d.estado}</td>
            <td>${d.total}</td>
        `;
        tabla.appendChild(fila);
    });
}

// COLORES ESTADO
function getClaseEstado(estado) {
    if (estado === "activo") return "atiempo";
    if (estado === "en_proceso") return "proximo";
    if (estado === "cerrado") return "urgente";
    return "";
}

// INICIAL
window.onload = () => {
    cargarResumen();
    generarReporte();
};