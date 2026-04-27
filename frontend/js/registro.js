function registrar() {
  let nombre = document.getElementById("nombre").value;
  let correo = document.getElementById("correo").value;
  let password = document.getElementById("password").value;
  let rol = document.getElementById("rol").value;

  fetch("http://127.0.0.1:8000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nombre: nombre,
      email: correo,
      password: password,
      rol: rol.toLowerCase()
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.msg) {
      alert(data.msg);
      window.location.href = "../index.html"; // volver al login
    } else {
      alert(data.error);
    }
  });

  return false;
}
