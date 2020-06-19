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
  let divCarousel = document.createElement('div');
  carousel.appendChild(divCarousel);
  divCarousel.classList.add('swiper-container');
  let itemCarousel = document.createElement('div');
  itemCarousel.classList.add('swiper-wrapper')
  divCarousel.appendChild(itemCarousel);
  
  items.forEach(item =>{
    let divSlide = document.createElement('div');
    itemCarousel.appendChild(divSlide);
    divSlide.classList.add('swiper-slide', 'div-slide')
    divSlide.innerHTML = `
    <img  src="${item.images[0].url}" class="img-carousel" alt="Banner filme">
    `
  })

  divCarousel.innerHTML += `
    <div class="swiper-pagination"></div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
    ` 

  var swiper = new Swiper('.swiper-container', {
    slidesPerView: 3,
    loop: true,
    centeredSlides: true,
    spaceBetween: 30,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      1024: {
        slidesPerView: 3,
      },
  
      820:{
        slidesPerView: 2,
      },
  
      640:{
        slidesPerView: 2,
      },
  
      340:{
        slidesPerView: 1,
      }
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
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
    let divCarousel = document.createElement('div')
    menu.appendChild(divCarousel);   
    divCarousel.classList.add('swiper-container', 'div-carousel')

    let titleCategoria = document.createElement('h5')
    titleCategoria.innerHTML += categoria
    divCarousel.appendChild(titleCategoria)
   

    let divCards = document.createElement('div')
    divCarousel.appendChild(divCards)
    divCards.classList.add('swiper-wrapper')

    for (let i = 0; i < cards.length; i++) {
    if(cards[i].isBlocked){
      divCards.innerHTML = `
      ${divCards.innerHTML} 
      <div class="swiper-slide">
        <img class="card" src="${cards[i].images[0].url}" alt="Card do filme"><img class="icon-shopping" src='./assets/block.png'></img>
      </div>`
    } else {
      divCards.innerHTML = `
          ${divCards.innerHTML} 
          <div class="swiper-slide">
            <img class="card" src="${cards[i].images[0].url}" alt="Card do filme ${cards[i].title}"><img class="icon-shopping" src='./assets/shopping-white.png'></img>
          </div>`
    }
    }

    divCarousel.innerHTML += `
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
    `
  }, categories)  

  var mySwiper = new Swiper ('.div-carousel', {
    // Optional parameters
    direction: "horizontal",
  loop: true,
  spaceBetween: 10,
  slidesPerView: 6,
  slidesPerGroup: 6,
  height: 200,
  slidesOffsetBefore: 0,

  breakpoints: {
    1024: {
      slidesPerView: 5,
    },

    820:{
      slidesPerView: 4,
    },

    640:{
      slidesPerView: 3,
    },

    340:{
      slidesPerView: 1,
    }
  },

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
  })
}

getApi(url)