const carousel = document.getElementById('carousel')
const menu = document.getElementById('menu');
const menuTemidos = document.getElementById('temidos');
const menuNacional = document.getElementById('nacional');
const menuDc = document.getElementById('dc');
const menuMarvel = document.getElementById('marvel');

const url = "https://sky-frontend.herokuapp.com/movies";

async function getApi(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const json = await response.json();
            console.log(json);
            getCarousel(json[0].items);

        } else {
            const err = `${response.status}: ${response.statusText}`;
        }
    }

    catch (error) {
        criaErro('Falha na requisição da API');
    }
}

criaErro = (erro) => {
    document.body.innerHTML = `<h1 class='text-danger'>${erro}</h1>`;
}


function getCarousel(items) {
    console.log(items);
    let itemCarousel = document.createElement('div')
    carousel.appendChild(itemCarousel)
    itemCarousel.innerHTML = `
    <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
    <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="${items[0].images[0].url}" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h5>${items[0].title}</h5>
        <p>${items[0].description}</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="${items[1].images[0].url}" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h5>${items[1].title}</h5>
        <p>${items[1].description}</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="${items[2].images[0].url}" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
      <h5>${items[2].title}</h5>
      <p>${items[2].description}</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="${items[3].images[0].url}" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
      <h5>${items[3].title}</h5>
      <p>${items[3].description}</p>
      </div>
    </div>
    <div class="carousel-item">
    <img src="${items[4].images[0].url}" class="d-block w-100" alt="...">
    <div class="carousel-caption d-none d-md-block">
    <h5>${items[4].title}</h5>
    <p>${items[4].description}</p>
    </div>
  </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
    `
}

getApi(url)