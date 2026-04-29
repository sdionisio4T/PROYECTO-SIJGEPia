const btnNuevo = document.getElementById("btnNuevo");
const modal = document.getElementById("modal");
const cerrarModal = document.getElementById("cerrarModal");
const form = document.getElementById("pqrsForm");
const tabla = document.getElementById("tbodyPQRS");

// ABRIR MODAL

btnNuevo.addEventListener("click", () => {

    modal.style.display = "flex";

});


// CERRAR MODAL

cerrarModal.addEventListener("click", () => {

    modal.style.display = "none";

});

async function cargarPQRS() {
  const res = await fetch("http://127.0.0.1:8000/pqrs");
  const data = await res.json();

      console.log("PQRS cargadas:", data);

  tabla.innerHTML = "";

  data.forEach(pqrs => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${pqrs.nombre_ciudadano}</td>
      <td>${pqrs.correo}</td>
      <td>${pqrs.tipo}</td>
      <td>${pqrs.descripcion}</td>
      <td><span class="respuesta-pendiente">Pendiente</span></td>
       <td><span class="estado ${pqrs.estado}">${pqrs.estado}</span></td>
    `;
    tabla.appendChild(fila);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const tipo = document.getElementById("tipo").value;
  const mensaje = document.getElementById("mensaje").value;

  const res = await fetch("http://127.0.0.1:8000/pqrs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nombre_ciudadano: nombre,
      correo: correo,
      tipo: tipo.toLowerCase(),
      descripcion: mensaje
    })
  });

  const data = await res.json();

  if (res.ok) {
    form.reset();
    modal.style.display = "none";
    cargarPQRS();
  } else {
    alert(data.detail || "Error al guardar PQRS");
  }
});

cargarPQRS();
