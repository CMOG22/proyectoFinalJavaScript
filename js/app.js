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

//login
function go(){
    let login = "admin";
    let password = "admin";
    if (document.form.password.value==password && document.form.login.value==login){
        window.location="./pages/admin.html"
    } else {
        alert("Usuario y/o contraeña invalidos")
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
    const fCita = document.querySelector('#fCita').value;
    const observaciones = document.querySelector('#observaciones').value;

    //Agregar datos al Array
    datos.push({nombre: nombre, email: email, telefono: telefono, sexo: sexo, especialidad: especialidad, fCita: fCita, observaciones: observaciones});

    //Guardar los datos en localstorage
    localStorage.setItem('datos',JSON.stringify(datos));

    //limpiar campos del formulario
    document.querySelector('#nombre').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#telefono').value = '';
    document.querySelector('#sexo').value = '';
    document.querySelector('#especialidad').value = '';
    document.querySelector('#fCita').value = '';
    document.querySelector('#observaciones').value = '';

    actualizarTabla();
});

function actualizarTabla() {
    const tabla = document.querySelector('#tabla-datos');
    tabla.innerHTML = ''; //Limpia la tabla antes de agregar los nuevos datos

    datos.forEach((dato, indice) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${dato.nombre}</td>
            <td>${dato.email}</td>
            <td>${dato.telefono}</td>
            <td>${dato.sexo}</td>
            <td>${dato.especialidad}</td>
            <td>${dato.fCita}</td>
            <td>${dato.observaciones}</td>
            <td>
                <button onclick="eliminar(${indice})">Eliminar</button>
                <button onclick="editar(${indice})">Editar</button>
            </td>
        `;
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
    document.querySelector('#fCita').value = dato.fCita;
    document.querySelector('#observaciones').value = dato.observaciones;

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
        const fCita = document.querySelector('#fCita').value;
        const observaciones = document.querySelector('#observaciones').value;
        
        //agregar los nuevos datos al array
        datos.splice(indice, 0, {nombre: nombre, email: email, telefono: telefono, sexo: sexo, especialidad: especialidad, fCita: fCita, observaciones: observaciones});

        //limpiar los campos del formulario
        document.querySelector('#nombre').value = '';
        document.querySelector('#email').value = '';
        document.querySelector('#telefono').value = '';
        document.querySelector('#sexo').value = '';
        document.querySelector('#especialidad').value = '';
        document.querySelector('#fCita').value = '';
        document.querySelector('#observaciones').value = '';

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
/*
function validarFecha() {
    //obtener fecha actual
    var fechaActual = new Date();

    //Obtener la fecha seleccionada por usuario
    var fechaSeleccionada = new Date(document.getElementById('fCita').value);

    //comparar las fechas
    if (fechaSeleccionada < fechaActual) {
        alert('La fehca seleccionada no puede ser anterior a la actual.');
        return false;
    }
}
*/