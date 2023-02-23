//Clima
const apiKey = "a1c64599d7240ad7721462df513972c3";
const city = "mexico, city";
const unit = "metric";
async function getWeather() {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`);
  const data = await response.json();
  const weather = data.weather[0].main;
  const temperature = data.main.temp;
  document.getElementById("weather").textContent = weather;
  document.getElementById("temperature").textContent = temperature;
}
getWeather();



//news
const API_KEY = "f008da95e4be4858af8e477a91876596";
const newsList = document.getElementById("news-list");
let page = 1;
async function getNews(page) {
  const response = await fetch(`https://newsapi.org/v2/everything?q=salud&dieta&ejercicio&pageSize=15&page=${page}&apiKey=${API_KEY}`);
  const data = await response.json();
  newsList.innerHTML = "";
  data.articles.forEach(article => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = article.url;
    a.target ="_blank"
    const img = document.createElement("img");
    img.src = article.urlToImage;
    img.alt = article.title;
    li.appendChild(img);
    a.textContent = article.title;
    li.appendChild(a);
    newsList.appendChild(li);
  });
  updatePagination();
}
function updatePagination() {
  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");
  prevButton.disabled = page === 1;
  nextButton.disabled = !data.articles.length;
}
function prevPage() {
  if (page > 1) {
    page--;
    getNews(page);
  }
}
function nextPage() {
  page++;
  getNews(page);
}
getNews(page);

// Función de inicio de sesión
function go(){
    let login = "admin";
    let password = "admin";
    if (document.form.password.value == password && document.form.login.value == login){
        window.location="./pages/admin.html"
    } else {
        Toastify({
            text: "Usuario y/o contraseña inválidos",
            duration: 3000,
            close: true,
            gravity: "bottom",
            position: "center",
            backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)",
        }).showToast();
    }
}

//Admin
    //almacenar datos
const datos = JSON.parse(localStorage.getItem('datos')) || [];

const formulario = document.querySelector('#formulario');
formulario.addEventListener('submit', (e) => {
    e.preventDefault();//prevenir la carga de la pagina

    const nombre = document.querySelector('#nombre').value;
    const email = document.querySelector('#email').value;
    const telefono = document.querySelector('#telefono').value;
    const sexo = document.querySelector('#sexo').value;
    const especialidad = document.querySelector('#especialidad').value;
    const costo = document.querySelector('#costo').value;
    const fCita = document.querySelector('#fCita').value;
    const observaciones = document.querySelector('#observaciones').value;
    const descuento = document.querySelector('#descuento').value;
    const total = document.querySelector('#total').value;

    if (nombre.trim() === '' || email.trim() === '' || telefono.trim() === '' || sexo.trim() === '' || especialidad.trim() === '' || costo.trim() === '' || fCita.trim() === '' ) {
      Toastify({
        text: "Completa los campos obligatorios",
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "center",
        backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)",
    }).showToast();
      return;
  }


    //Agregar datos al Array
    datos.push({nombre: nombre, email: email, telefono: telefono, sexo: sexo, especialidad: especialidad, costo: costo, fCita: fCita, observaciones: observaciones, descuento: descuento, total: total });

    //Guardar los datos en localstorage
    localStorage.setItem('datos',JSON.stringify(datos));

    //limpiar campos del formulario
    document.querySelector('#nombre').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#telefono').value = '';
    document.querySelector('#sexo').value = '';
    document.querySelector('#especialidad').value = '';
    document.querySelector('#costo').value = '';
    document.querySelector('#fCita').value = '';
    document.querySelector('#observaciones').value = '';
    document.querySelector('#descuento').value = '';
    document.querySelector('#total').value = '';

    actualizarTabla();
});

function actualizarTabla() {
    const tabla = document.querySelector('#tabla-datos');
    tabla.innerHTML = ''; //Limpia la tabla antes de agregar los nuevos datos

    //obtener la fecha actual
    const fechaActual = new Date();
    
    //ordenar tabla
    datos.sort((a, b) => new Date(a.fCita) - new Date(b.fCita));
    
    
    datos.forEach((dato, indice) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${dato.nombre}</td>
            <td><a href="mailto:${dato.email}" title="${dato.email}">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-mail-forward" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 18h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v7.5" />
            <path d="M3 6l9 6l9 -6" />
            <path d="M15 18h6" />
            <path d="M18 15l3 3l-3 3" />
          </svg></a></td>
            <td><a href="tel:${dato.telefono}" title="${dato.telefono}">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-phone-call" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
            <path d="M15 7a2 2 0 0 1 2 2" />
            <path d="M15 3a6 6 0 0 1 6 6" />
          </svg>
            </a></td>
            <td>${dato.sexo}</td>
            <td>${dato.especialidad}</td>
            <td>${dato.costo}</td>
            <td>${dato.fCita}</td>
            <td>${dato.observaciones}</td>
            <td>${dato.total}</td>
            <td>
                <button onclick="eliminar(${indice})">Eliminar</button>
                <button onclick="editar(${indice})">Editar</button>
            </td>
        `;
        //comparar la fecha de la cita con la fecha actual
        const fechaCita = new Date(dato.fCita);
        if (fechaCita < fechaActual) {
            fila.classList.add('fila-roja');
        }

        tabla.appendChild(fila);
    });
}


function eliminar(indice) {
    datos.splice(indice, 1); //elimina el dato del array

    //guarda los datos actualizados del array
    localStorage.setItem('datos',JSON.stringify(datos));

    actualizarTabla();//Actualiza la tabla
}

function editar(indice) {
    const dato = datos[indice];

    document.querySelector('#nombre').value = dato.nombre;
    document.querySelector('#email').value = dato.email;
    document.querySelector('#telefono').value = dato.telefono;
    document.querySelector('#sexo').value = dato.sexo;
    document.querySelector('#especialidad').value = dato.especialidad;
    document.querySelector('#costo').value = dato.costo;
    document.querySelector('#fCita').value = dato.fCita;
    document.querySelector('#observaciones').value = dato.observaciones;
    document.querySelector('#descuento').value = dato.descuento;
    document.querySelector('#total').value = dato.total;

    //eliminar dato original 
    datos.splice(indice, 1);

    //guarda los datos actualizados
    localStorage.setItem('datos', JSON.stringify(datos));

    // Cambiar la función del botón "Agregar" para que actualice el dato en lugar de agregar uno nuevo
    const botonAgregar = document.querySelector('#formulario button');
    botonAgregar.innerHTML = 'Actualizar';
    botonAgregar.removeEventListener('click', agregar);
    botonAgregar.addEventListener('click', () => {
        //Obtener los nuevos valores
        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const sexo = document.querySelector('#sexo').value;
        const especialidad = document.querySelector('#especialidad').value;
        const costo = document.querySelector('#costo').value;
        const fCita = document.querySelector('#fCita').value;
        const observaciones = document.querySelector('#observaciones').value;
        const descuento = document.querySelector('#descuento').value;
        const total = document.querySelector('#total').value;

        //agregar los nuevos datos al array
        datos.splice(indice, 0, {nombre: nombre, email: email, telefono: telefono, sexo: sexo, especialidad: especialidad, costo: costo, fCita: fCita, observaciones: observaciones, descuento: descuento, total: total});

        //limpiar los campos del formulario
        document.querySelector('#nombre').value = '';
        document.querySelector('#email').value = '';
        document.querySelector('#telefono').value = '';
        document.querySelector('#sexo').value = '';
        document.querySelector('#especialidad').value = '';
        document.querySelector('#costo').value = '';
        document.querySelector('#fCita').value = '';
        document.querySelector('#observaciones').value = '';
        document.querySelector('#descuento').value = '';
        document.querySelector('#tital').value = '';

        //Cambiar la función del botón "Actualizar" para que agregue un nuevo dato en lugar de actualizar uno existente
        botonAgregar.innerHTML = 'Agregar';
        botonAgregar.removeEventListener('click', actualizar);
        botonAgregar.addEventListener('click', agregar);

        //guardar datos actualizados
        localStorage.setItem('datos',JSON.stringify(datos));

        //actualizar tabla
        actualizarTabla();
    });
}
actualizarTabla();

function llenarCosto () {
  var especialidad = document.getElementById("especialidad").value;
  var costo = document.getElementById("costo");

  switch(especialidad) {
    case "General":
      costo.value = "1000";
      break;
    case "Gediatra":
      costo.value = "1200";
      break;
    case "Pediatra":
      costo.value = "1500";
      break;
    case "Psicologo":
      costo.value = "800";
      break;
    default:
      costo.value = "";
      break;
  }
}
function descuentoTotal () {
  var descuento = document.getElementById("descuento").value;
  var total = document.getElementById("total");

  switch(descuento) {
    case "cero":
      total.value = costo.value;
      break;
    case "cinco":
      total.value = costo.value*0.95;
      break;
    case "diez":
      total.value = costo.value*0.90;
      break;
    default:
      total.value = "";
      break;
  }
}


function buscar() {
  const input = document.getElementById("buscar");
  const filter = input.value.toUpperCase();
  const table = document.getElementById("tabla-datos");
  const tr = table.getElementsByTagName("tr");

  for (let i = 0; i < tr.length; i++) {
    const td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      const txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function buscarPorEmail(email) {
  const citas = JSON.parse(localStorage.getItem('datos')) || [];

  for (const cita of citas) {
    if (cita.email === email) {
      return cita;
    }
  }

  return null; // si no se encontró ninguna cita con ese email
}