// Verifica sesión activa - debe ir primero
//verificarSesion()


cargarUsuarioHeader()



document.querySelector(".logout").addEventListener("click", function() {
  localStorage.clear()
})