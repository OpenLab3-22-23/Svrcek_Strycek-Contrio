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
    </div>
  </div>`

const searchOutput = document.getElementById('search') as HTMLInputElement;
const btn1 = document.getElementById('btn1') as HTMLInputElement;
let text: string = "";

function submit(): void {
  text = searchOutput.value;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '31c5235490msha1fb83c9e91f9d4p193520jsn67bdd3fc1f71',
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
  };

  fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10&minPopulation=15000&namePrefix=${text}`, options)
  .then(response => response.json())
  .then(response => {
    response.data.forEach((item, index) => {
      console.log(`${index + 1}. ${item.name} ${item.country}`)
    });
    // Iterovat response 

    // Na kazdom prvku vytovirt HTML DIV Element a obsianut datami z aktualneho prvku v iteracii

    // Na koniec vykreslit vsetky vygenerovane elementy do stranky

    // HTMLElement.appendChild()
  }
  )
  .catch(err => console.error(err));
}

btn1.addEventListener('click', submit);