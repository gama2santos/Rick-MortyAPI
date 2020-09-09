// Declaro variable que usaré más adelante dentro del código pero que aún no tengo su valor
let characters = []
let hideModalBtn

// Traigo los elementos del DOM con que necesito manipular
const grid = document.getElementById('grid')
const modal = document.getElementById('modal')

// Llamo la información desde la API desde que inicia la página
fetch('https://rickandmortyapi.com/api/character/')
  .then(response => response.json())
  // Uso destructuración para extraer sólo los resultado de la respuesta de la API
  .then(({ results }) => {
    // Almaceno los resultados en la variable characters para tenerlos disponible más delante
    // Y llamo la función encargada de renderizar el grid de personajes
    characters = results
    renderCharacters(characters)
  })
  .catch(console.log)


function renderCharacters(chars) {
  // Itero sobre el array de personajes y agrego un template de HTML
  chars.forEach(ch => {
    grid.innerHTML += `
      <div class="card">
        <img
          class="card__img"
          src=${ch.image}
        />
        <h4 class="card__name">${ch.name}</h4>
        <button class="card__button" id="${ch.id}">Details</button>
      </div>
    `
  })
  addListeners()
}


function addListeners() {
  // Una vez agregados los templates voy a seleciono todos los botones para
  // agregar los listeners que abrirán el modal
  document.querySelectorAll('.card__button')
    .forEach(btn => btn.addEventListener('click', showCharacterDetails))
}


function showCharacterDetails(event) {
  // Extraigo el id del botón al que se le da click para saber de qué personaje es y lo busco en el array
  const id = parseInt(event.target.id)
  const [character] = characters.filter(ch => ch.id === id)
  // Inserto la información del personaje en el modal
  modal.innerHTML = `
    <div class="modal__content" id="modal__content">
      <img src=${character.image} alt="" class="modal__img" id="modal__img">
      <h1>${character.name}</h1>
      <p>Especie: ${character.species}</p>
      <p>Genero: ${character.gender}</p>
      <p>Ubicación: ${character.location.name}</p>
      <p>Estatus: ${character.status}</p>
      <button id="modal__close">Cerrar</button>
    </div>
  `
  modal.classList.toggle('modal--active')

  // Una vez creado el modal, traigo su botón y le agrego un listener para cerrarlo
  hideModalBtn = document.getElementById('modal__close')
  hideModalBtn.addEventListener('click', hideModal)
}


function hideModal() {
  modal.classList.toggle('modal--active')
}