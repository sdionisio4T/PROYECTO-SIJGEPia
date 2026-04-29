function login() {
  let correo = document.querySelector("input[type='email']").value;
  let password = document.getElementById("password").value;

  fetch("http://127.0.0.1:8000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: correo,
      password: password
    })
  })
  .then(async res => {
    const data = await res.json();
    console.log("STATUS:", res.status);
    console.log("DATA:", data);

    if (res.ok) {

      localStorage.setItem("rol", data.rol);
      localStorage.setItem("token", data.access_token || "");

      window.location.href = "pages/dashboard.html";
    } else {
      alert(data.detail || data.error || data.msg || "Error al iniciar sesión");
    }
  })
  .catch(error => {
    console.error(error);
    alert("Error de conexión");
  });

  return false;
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