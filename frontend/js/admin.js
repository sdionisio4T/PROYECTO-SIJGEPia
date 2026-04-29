// ════════════════════════════════════════
//  Lógica del panel de administración
//  - Cambio de pestañas (Usuarios / Backups / Auditoría)
//  - Modal de Nuevo Usuario
// ════════════════════════════════════════


// Cambia entre las pestañas del panel de administración
function cambiarPestana(nombre) {
  // Quitar 'activa' de todos los botones de pestañas
  document.querySelectorAll(".tab-admin").forEach(function (b) {
    b.classList.remove("activa");
  });

  // Ocultar todos los paneles
  document.querySelectorAll(".tab-panel").forEach(function (p) {
    p.classList.remove("activa");
    p.style.display = "none";
  });

  // Activar el botón clickeado
  var botonActivo = document.querySelector(
    '.tab-admin[onclick*="' + nombre + '"]'
  );
  if (botonActivo) botonActivo.classList.add("activa");

  // Mostrar el panel correspondiente
  var panel = document.getElementById("panel-" + nombre);
  if (panel) {
    panel.classList.add("activa");
    panel.style.display = "block";
  }
}


// Abrir modal de Nuevo Usuario
function abrirModalUsuario() {
  var modal = document.getElementById("modal-usuario");
  if (modal) modal.style.display = "flex";
}


// Cerrar modal de Nuevo Usuario
function cerrarModalUsuario() {
  var modal = document.getElementById("modal-usuario");
  if (modal) modal.style.display = "none";
}


// Conectar eventos cuando carga la página
document.addEventListener("DOMContentLoaded", function () {
  // Botón Cancelar del modal
  var btnCancelar = document.querySelector("#modal-usuario .btn-cancelar");
  if (btnCancelar) {
    btnCancelar.addEventListener("click", cerrarModalUsuario);
  }

  // Cerrar el modal al hacer clic en el fondo oscuro
  var modal = document.getElementById("modal-usuario");
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) cerrarModalUsuario();
    });
  }
});