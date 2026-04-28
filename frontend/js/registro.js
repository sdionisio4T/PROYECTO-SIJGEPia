function registrar() {
  let nombre = document.getElementById("nombre").value;
  let correo = document.getElementById("correo").value;
  let password = document.getElementById("password").value;
  let rol = document.getElementById("rol").value.toLowerCase();

  if (rol === "administrador") {
    rol = "admin";
  }

  fetch("http://127.0.0.1:8000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nombre: nombre,
      email: correo,
      password: password,
      rol: rol
    })
  })
    .then(async res => {
      const data = await res.json();

      if (res.ok) {
        alert("Usuario registrado correctamente");
        window.location.href = "../index.html";
      } else {
        alert(data.detail || data.error || "Error al registrar");
      }
    })
    .catch(error => {
      console.error(error);
      alert("No se pudo conectar con el servidor");
    });

  return false;
}