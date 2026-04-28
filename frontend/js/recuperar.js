function recuperarPassword() {
  const correo = document.getElementById("correo").value;
  const mensaje = document.getElementById("mensaje");

  if (!correo) {
    mensaje.innerText = "Ingresa tu correo";
    return false;
  }

  fetch("http://127.0.0.1:8000/recuperar-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: correo
    })
  })
  .then(async res => {
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      mensaje.innerText = "Revisa tu correo para continuar";
    } else {
      mensaje.innerText = data.detail || "Error al enviar";
    }
  })
  .catch(() => {
    mensaje.innerText = "Error de conexión con el servidor";
  });

  return false;
}