let expedientes = JSON.parse(localStorage.getItem("expedientes")) || [];

const btnNuevo = document.querySelector(".nuevo");
const modal = document.getElementById("modalExpediente");
const cerrarModal = document.getElementById("cerrarModal");
const form = document.getElementById("formExpediente");
const tabla = document.querySelector("tbody");

// ABRIR MODAL
btnNuevo.addEventListener("click", () => {
  modal.style.display = "flex";
});

// CERRAR MODAL
cerrarModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// GUARDAR EXPEDIENTE
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const tipo = document.getElementById("tipo").value;
  const demandante = document.getElementById("demandante").value;
  const fechaInput = document.getElementById("fecha").value;

  const hoy = new Date();
  const fechaExpediente = new Date(fechaInput);

  const diferenciaTiempo = fechaExpediente - hoy;
  const dias = Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24));

  let textoVence = "";
  let estado = "";
  let claseEstado = "";

  // 🔥 LÓGICA AUTOMÁTICA
  if (dias <= 0) {
    textoVence = "Vencido";
    estado = "Urgente";
    claseEstado = "urgente";
  } else if (dias === 1) {
    textoVence = "1 día";
    estado = "Urgente";
    claseEstado = "urgente";
  } else if (dias <= 3) {
    textoVence = dias + " días";
    estado = "Próximo";
    claseEstado = "proximo";
  } else {
    textoVence = dias + " días";
    estado = "A tiempo";
    claseEstado = "atiempo";
  }

  const fechaFormateada = new Date(fechaInput).toLocaleDateString("es-CO");

const fila = document.createElement("tr");
const id = Date.now(); // ID único
const nuevoExpediente = {
  id,
  tipo,
  demandante,
  fecha: fechaInput
};

expedientes.push(nuevoExpediente);
localStorage.setItem("expedientes", JSON.stringify(expedientes));

const tieneDocs = tieneDocumentos(id);

fila.innerHTML = `
  <td>${tipo}</td>
  <td>${demandante}</td>
  <td>${fechaFormateada}</td>
  <td>${textoVence}</td>
  <td class="${claseEstado}">${estado}</td>

  <td>
    <button onclick="verDocumentos(${id})" class="${tieneDocs ? 'btn-subido' : 'btn-subir'}">
      📄 ${tieneDocs ? 'Subido' : 'Subir'}
    </button>
  </td>

  <td>
    <button onclick="eliminarExpediente(event, ${id})" class="btn-eliminar">
      🗑️
    </button>
  </td>
`;

  tabla.appendChild(fila);

  form.reset();
  modal.style.display = "none";
});

function verDocumentos(id) {
  window.location.href = "documentos.html?id=" + id;
}

const checkboxes = document.querySelectorAll(".filtro input[type='checkbox']");
const filas = () => document.querySelectorAll("tbody tr");

checkboxes.forEach(cb => {
  cb.addEventListener("change", filtrar);
});

function tieneDocumentos(id) {
  const datos = JSON.parse(localStorage.getItem("documentos")) || {};
  return datos[id] && datos[id].length > 0;
}

function filtrar() {
  const activos = Array.from(checkboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.parentElement.textContent.trim().toLowerCase());

  filas().forEach(fila => {
    const texto = fila.textContent.toLowerCase();

    if (activos.length === 0) {
      fila.style.display = "";
    } else {
      const coincide = activos.some(f => texto.includes(f));
      fila.style.display = coincide ? "" : "none";
    }
  });
}

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

function actualizarBotones() {
  const filas = document.querySelectorAll("tbody tr");

  filas.forEach(fila => {
    const btnDoc = fila.querySelector("td:nth-child(6) button");

    if (!btnDoc) return;

    const idMatch = btnDoc.getAttribute("onclick").match(/\d+/);
    if (!idMatch) return;

    const id = idMatch[0];

    if (tieneDocumentos(id)) {
      btnDoc.classList.remove("btn-subir");
      btnDoc.classList.add("btn-subido");
      btnDoc.innerHTML = "📄 Subido";
    }
  });
}

window.addEventListener("load", () => {
  cargarExpedientes();
  actualizarBotones();
});

function eliminarExpediente(e, id) {
  if (!confirm("¿Seguro que quieres eliminar este expediente?")) return;

  // eliminar de array
  expedientes = expedientes.filter(exp => exp.id !== id);
  localStorage.setItem("expedientes", JSON.stringify(expedientes));

  // eliminar documentos
  const datos = JSON.parse(localStorage.getItem("documentos")) || {};
  delete datos[id];
  localStorage.setItem("documentos", JSON.stringify(datos));

  // eliminar visual
  e.target.closest("tr").remove();
}

const buscador = document.querySelector("input[type='text']");

buscador.addEventListener("input", () => {
  const valor = buscador.value.toLowerCase();

  filas().forEach(fila => {
    const texto = fila.textContent.toLowerCase();
    fila.style.display = texto.includes(valor) ? "" : "none";
  });
});

function exportarBackup() {
  const data = {
    expedientes: JSON.parse(localStorage.getItem("expedientes")) || [],
    documentos: JSON.parse(localStorage.getItem("documentos")) || {}
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "backup_completo.json";
  a.click();
}

document.getElementById("importarBackup").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function(event) {
    const data = JSON.parse(event.target.result);

    if (data.expedientes) {
      localStorage.setItem("expedientes", JSON.stringify(data.expedientes));
    }

    if (data.documentos) {
      localStorage.setItem("documentos", JSON.stringify(data.documentos));
    }

    alert("Backup restaurado correctamente");
    location.reload();
  };

  reader.readAsText(file);
});

function cargarExpedientes() {
  tabla.innerHTML = "";

  expedientes.forEach(exp => {
    const fechaExpediente = new Date(exp.fecha);
    const hoy = new Date();
    const dias = Math.ceil((fechaExpediente - hoy) / (1000 * 60 * 60 * 24));

    let textoVence = "";
    let estado = "";
    let claseEstado = "";

    if (dias <= 0) {
      textoVence = "Vencido";
      estado = "Urgente";
      claseEstado = "urgente";
    } else if (dias === 1) {
      textoVence = "1 día";
      estado = "Urgente";
      claseEstado = "urgente";
    } else if (dias <= 3) {
      textoVence = dias + " días";
      estado = "Próximo";
      claseEstado = "proximo";
    } else {
      textoVence = dias + " días";
      estado = "A tiempo";
      claseEstado = "atiempo";
    }

    const fila = document.createElement("tr");
    const tieneDocs = tieneDocumentos(exp.id);

    fila.innerHTML = `
      <td>${exp.tipo}</td>
      <td>${exp.demandante}</td>
      <td>${new Date(exp.fecha).toLocaleDateString("es-CO")}</td>
      <td>${textoVence}</td>
      <td class="${claseEstado}">${estado}</td>

      <td>
        <button onclick="verDocumentos(${exp.id})" class="${tieneDocs ? 'btn-subido' : 'btn-subir'}">
          📄 ${tieneDocs ? 'Subido' : 'Subir'}
        </button>
      </td>

      <td>
        <button onclick="eliminarExpediente(event, ${exp.id})" class="btn-eliminar">
          🗑️
        </button>
      </td>
    `;

    tabla.appendChild(fila);
    actualizarBotones();
  });
}





