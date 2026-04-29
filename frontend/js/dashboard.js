// Verifica sesión activa - debe ir primero
//verificarSesion()


cargarUsuarioHeader()


// ════════════════════════════════════════
//  Dashboard SIGJEP
// ════════════════════════════════════════

// Verifica sesión activa - debe ir primero
//verificarSesion()

cargarUsuarioHeader();


// ════════════════════════════════════════
//  Datos simulados (mock data)
//  Cuando el backend esté listo, reemplazar
//  por: await fetch("/dashboard/resumen")
// ════════════════════════════════════════

const datosTipos = {
  labels: ["Tutelas", "Demandas", "PQRS", "Derechos de petición"],
  values: [45, 30, 15, 10]
};

const datosMeses = {
  labels: ["Nov", "Dic", "Ene", "Feb", "Mar", "Abr"],
  values: [8, 12, 15, 10, 18, 14]
};


// ════════════════════════════════════════
//  Crear gráficas con Chart.js
// ════════════════════════════════════════

function inicializarGraficas() {
  // Esperar a que Chart.js esté disponible
  if (typeof Chart === "undefined") {
    setTimeout(inicializarGraficas, 100);
    return;
  }

  // Colores que usa el sistema
  const colorPrimario = "#1E3A8A";
  const colorVerde = "#22C55E";
  const colorAmarillo = "#F59E0B";
  const colorRojo = "#EF4444";
  const colorAzulHover = "#162A63";

  // ═══ Gráfica 1: Distribución por tipo (dona) ═══
  const ctxTipos = document.getElementById("graficaTipos");
  if (ctxTipos) {
    new Chart(ctxTipos, {
      type: "doughnut",
      data: {
        labels: datosTipos.labels,
        datasets: [{
          data: datosTipos.values,
          backgroundColor: [colorPrimario, colorAmarillo, colorVerde, colorRojo],
          borderWidth: 2,
          borderColor: "#fff"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              padding: 12,
              font: { size: 12, family: "'Inter', sans-serif" }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const valor = context.parsed;
                const pct = ((valor / total) * 100).toFixed(1);
                return context.label + ": " + valor + " casos (" + pct + "%)";
              }
            }
          }
        }
      }
    });
  }

  // ═══ Gráfica 2: Casos por mes (barras) ═══
  const ctxMeses = document.getElementById("graficaMeses");
  if (ctxMeses) {
    new Chart(ctxMeses, {
      type: "bar",
      data: {
        labels: datosMeses.labels,
        datasets: [{
          label: "Casos radicados",
          data: datosMeses.values,
          backgroundColor: colorPrimario,
          hoverBackgroundColor: colorAzulHover,
          borderRadius: 6,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.parsed.y + " casos";
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 5,
              font: { size: 11, family: "'Inter', sans-serif" }
            },
            grid: { color: "#f0f0f0" }
          },
          x: {
            ticks: {
              font: { size: 12, family: "'Inter', sans-serif" }
            },
            grid: { display: false }
          }
        }
      }
    });
  }
}

// Iniciar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", inicializarGraficas);