function registrar() {
  let nombre = document.getElementById("nombre").value;
  let correo = document.getElementById("correo").value;
  let password = document.getElementById("password").value;
  let rol = document.getElementById("rol").value;

  if (!nombre || !correo || !password || !rol) {
    alert("Completa todos los campos");
    return false;
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
      rol: rol.toLowerCase()
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);

    if (data.msg) {
      alert("Registro exitoso");
      window.location.href = "../index.html"; // 👈 importante
    } else {
      alert(data.error);
    }
  })
  .catch(() => {
    alert("Error de conexión con el servidor");
  });

  return false;
}

function login() {
  let correo = document.querySelector("input[type='email']").value;
  let password = document.querySelector("input[type='password']").value;

  fetch("http://127.0.0.1:8000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      correo: correo,
      password: password
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);

    if (data.msg) {
      localStorage.setItem("rol", data.rol);
      window.location.href = "pages/dashboard.html";
    } else {
      alert(data.error);
    }
  })
  .catch(() => {
    alert("Error de conexión");
  });

  return false;
}