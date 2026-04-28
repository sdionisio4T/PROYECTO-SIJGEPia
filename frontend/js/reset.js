function cambiarPassword() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  const password = document.getElementById("password").value;
  const confirmarPassword = document.getElementById("confirmarPassword").value;
  const mensaje = document.getElementById("mensaje");

  if (!token) {
    mensaje.innerText = "Token inválido o faltante";
    mensaje.className = "mensaje error";
    return false;
  }

  if (password !== confirmarPassword) {
    mensaje.innerText = "Las contraseñas no coinciden";
    mensaje.className = "mensaje error";
    return false;
  }

  fetch("http://127.0.0.1:8000/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token: token,
      password: password
    })
  })
  .then(async res => {
    const data = await res.json();

    if (res.ok && data.msg) {
      mensaje.innerText = "Contraseña actualizada correctamente";
      mensaje.className = "mensaje ok";

      setTimeout(() => {
        window.location.href = "../index.html";
      }, 1500);
    } else {
      mensaje.innerText = data.detail || data.error || "No se pudo cambiar la contraseña";
        mensaje.className = "mensaje error";
    }
  })
  .catch(() => {
    mensaje.innerText = "Error de conexión con el servidor";
      mensaje.className = "mensaje error";
  });

  return false;
}

function validarPasswords() {
  const password = document.getElementById("password").value;
  const confirmar = document.getElementById("confirmarPassword").value;
  const mensaje = document.getElementById("mensaje");

  if (confirmar === "") {
    mensaje.innerText = "";
    mensaje.className = "mensaje";
    return;
  }

  if (password !== confirmar) {
    mensaje.innerText = "Las contraseñas no coinciden";
    mensaje.className = "mensaje error";
    return;
  }

  mensaje.innerText = "Las contraseñas coinciden";
  mensaje.className = "mensaje ok";
}


function togglePassword(id, icon) {
  const input = document.getElementById(id);

  if (input.type === "password") {
    input.type = "text";
    icon.textContent = "🙈";
  } else {
    input.type = "password";
    icon.textContent = "👁️";
  }
}