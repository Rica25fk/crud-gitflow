let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
let editandoIndex = null;

function guardarDatos() {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function mostrarUsuarios() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  if (usuarios.length === 0) {
    lista.innerHTML = "<p>No hay usuarios registrados</p>";
    return;
  }

  usuarios.forEach((user, index) => {
    lista.innerHTML += `
      <li>
        <strong>${user.nombre}</strong> - ${user.correo}
        <br>
        <button onclick="editarUsuario(${index})">Editar</button>
        <button onclick="eliminarUsuario(${index})">Eliminar</button>
      </li>
    `;
  });
}

function validarCorreo(correo) {
  return correo.includes("@") && correo.includes(".");
}

function agregarUsuario() {
  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();

  if (!nombre || !correo) {
    alert("Todos los campos son obligatorios");
    return;
  }

  if (!validarCorreo(correo)) {
    alert("Correo no válido");
    return;
  }

  if (editandoIndex === null) {
    usuarios.push({ nombre, correo });
    alert("Usuario agregado correctamente");
  } else {
    usuarios[editandoIndex] = { nombre, correo };
    alert("Usuario actualizado");
    editandoIndex = null;
  }

  guardarDatos();
  limpiarFormulario();
  mostrarUsuarios();
}

function editarUsuario(index) {
  const user = usuarios[index];
  document.getElementById("nombre").value = user.nombre;
  document.getElementById("correo").value = user.correo;
  editandoIndex = index;
}

function eliminarUsuario(index) {
    alert("Eliminando usuario"); 
  if (confirm("¿Seguro que deseas eliminar este usuario?")) {
    usuarios.splice(index, 1);
    guardarDatos();
    mostrarUsuarios();
    alert("Usuario eliminado");
  }
}

function limpiarFormulario() {
  document.getElementById("nombre").value = "";
  document.getElementById("correo").value = "";
}

mostrarUsuarios();