import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML =`
  <div>
    <h1 class="headher">Contrio</h1>
    <div class="search-menu">
      <input class="search-bar" type="text" placeholder="Search.." id="search">
      <input class="search-button" type="button" id="btn1" value="Search">
    </div>
    <div id="grid" class="country-grid">
      <div id="div1" class="country">name: Berlin</div>
    </div>
  </div>`
type City = {
    name : string;
    country : string;
    region : string;
    population : number;
}

const searchOutput = document.getElementById('search') as HTMLInputElement;
const btn1 = document.getElementById('btn1') as HTMLInputElement;
let text: string = "";

function submit(): void {
  deleteGridChild();
  text = searchOutput.value;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '31c5235490msha1fb83c9e91f9d4p193520jsn67bdd3fc1f71',
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
  };

  fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10&minPopulation=15000&namePrefix=${text}&types=CITY`, options)
  .then(response => response.json())
  .then(response => {

    let APIdata: City[] = [];

    for (let i = 0; i < response.data.length; i++) {
      const city: City = {
        name : response.data[i].name,
        country : response.data[i].country,
        region : response.data[i].region,
        population : response.data[i].population,
      }
      APIdata[i] = city;
    }
    console.log(APIdata);

    ElementPusher(APIdata)
  }
  )
  .catch(err => console.error(err));
}

btn1.addEventListener('click', submit);

function ElementPusher(data : Array<City>) : void {
  for (let i = 0; i < data.length; i++) {
    const newDiv= document.createElement("div");
    const newContent1 = document.createTextNode("name: " + data[i].name);
    newDiv.appendChild(newContent1);
    document.getElementById('grid')!.appendChild(newDiv);
  }
}

function deleteGridChild() : void {
  let e = document.getElementById("grid")!;
  let child = e.lastElementChild; 
  while (child) {
      e.removeChild(child);
      child = e.lastElementChild;
  }
}

    // Iterovat response 

    // Na kazdom prvku vytovirt HTML DIV Element a obsianut datami z aktualneho prvku v iteracii

    // Na koniec vykreslit vsetky vygenerovane elementy do stranky

    // HTMLElement.appendChild()