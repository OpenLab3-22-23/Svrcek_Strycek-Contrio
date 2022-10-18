import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML =`
  <div>
    <h1 class="headher">Contrio</h1>
    <div class="headher">
      <input id="Search" type="text" placeholder="Search..">
      <button>Search</button>
    </div>
    <br>
    <div class="countrybuttonrow1">
      <button>Country 1</button>
      <button>Country 1</button>
      <button>Country 1</button>
      <button>Country 1</button>
      <button>Country 1</button>
  </div>`

let result;
function submite() {
  result = Number(document.getElementById("Search"));
  console.log(result);
}

submite();  
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '31c5235490msha1fb83c9e91f9d4p193520jsn67bdd3fc1f71',
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
  };
  
  fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10&minPopulation=15000&namePrefix=${text}`, options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));