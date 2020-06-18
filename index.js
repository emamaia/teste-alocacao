const carousel = document.getElementById('carousel')
const menu = document.getElementById('menu');

const url = "https://sky-frontend.herokuapp.com/movies";

async function getApi(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const json = await response.json();
            console.log(json);
            getCarousel(json[0].items);
            getCards(json[2].movies)

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
  <div class="carousel-inner mt-4 image-carousel">
    <div class="carousel-item active">
      <img src="${items[0].images[0].url}" class="d-block w-100" alt="Imagem filme">     
    </div>
    <div class="carousel-item">
      <img src="${items[1].images[0].url}" class="d-block w-100" alt="Imagem filme">     
    </div>
    <div class="carousel-item">
      <img src="${items[2].images[0].url}" class="d-block w-100" alt="Imagem filme">      
    </div>
    <div class="carousel-item">
      <img src="${items[3].images[0].url}" class="d-block w-100" alt="Imagem filme">     
    </div>
    <div class="carousel-item">
    <img src="${items[4].images[0].url}" class="d-block w-100" alt="Imagem filme">    
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


function getCards(card) {
    console.log(card);
    let categories = new Map();
    for (let i = 0; i < card.length; i++) {
        let splits = card[i].categories.split(', ');
        console.log(splits)
        splits.forEach(element => {
            console.log(element)
            let cardsCategories = categories.get(element);
            if (cardsCategories === undefined) {
                cardsCategories = [card[i]];
                categories.set(element, cardsCategories);
            } else {
                cardsCategories.push(card[i])
            }
        });
    }

    categories.forEach(function (cards, categoria) {
        let divCategoria = document.createElement('div')
        menu.appendChild(divCategoria);
        let titleCategoria = document.createElement('h5')
        menu.appendChild(titleCategoria)
        divCategoria.classList.add('div-categoria')
        titleCategoria.innerHTML += categoria
        for (let i = 0; i < cards.length; i++) {
            let menuCard = document.createElement('div');
            divCategoria.appendChild(menuCard);
            menuCard.innerHTML += `<img class="card" src="${cards[i].images[0].url}" alt="Card do filme">`
        }

    }, categories)

   
}


getApi(url)