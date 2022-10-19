import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML =`
  <div>
    <h1 class="headher">Contrio</h1>
    <div class="search-menu">
      <input class="search-bar" type="text" placeholder="Search.." id="search">
      <input class="search-button" type="button" id="btn1" value="Search">
    </div>
    <div class="country-grid">
      <div class="country"><a>Country 1</a></div>
      <div class="country"><a>Country 2</a></div>
      <div class="country"><a>Country 3</a></div>
      <div class="country"><a>Country 4</a></div>
      <div class="country"><a>Country 5</a></div>
      <div class="country"><a>Country 6</a></div>
      <div class="country"><a>Country 7</a></div>
      <div class="country"><a>Country 8</a></div>
      <div class="country"><a>Country 9</a></div>
      <div class="country"><a>Country 10</a></div>
      <div class="country"><a>Country 11</a></div>
      <div class="country"><a>Country 12</a></div>
    </div>
  </div>`

const searchOutput = document.getElementById('search');
const btn1 = document.getElementById('btn1');
let text: string = "";

function submit(): void {
  text = searchOutput.value;

  fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10&minPopulation=15000&namePrefix=${text}`, options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
}

btn1.addEventListener('click', submit);

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '31c5235490msha1fb83c9e91f9d4p193520jsn67bdd3fc1f71',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
  }
};