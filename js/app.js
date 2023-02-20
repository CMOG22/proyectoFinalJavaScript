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