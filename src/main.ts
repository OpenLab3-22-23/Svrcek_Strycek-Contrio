import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML =`
  <div>
    <h1 class="headher">Contrio</h1>
    <div class="container">
      <div class="search-bar">
        <input class="search-input" type="text" placeholder="Search for city.." id="search">
        <button class="search-button" id="btn1"><i class="fa-solid fa-magnifying-glass"></i></button>
		  </div>
    </div>
    <div class="slider-container">
      <div class="slider-box">
          <p class="slider-paragraph">City</p>
            <label class="switch">
              <input type="checkbox">
              <span class="slider round"></span>
            </label>
          <p class="slider-paragraph">Country</p>
        </div> 
      </div>
    </div>
    <div id="grid" class="country-grid">
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

submit()
btn1.addEventListener('click', submit);

function submit(): void {
  deleteGridChild();
  text = searchOutput.value;
  if (text == "") {
    text = "Kysucke";    
  }

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

function ElementPusher(data : Array<City>) : void {
  for (let i = 0; i < data.length; i++) {
    const newDiv= document.createElement("div");

    const cityParagraph = document.createElement("p");
    const newCity = document.createTextNode(`Name: ${data[i].name}`);
    cityParagraph.appendChild(newCity);
    newDiv.appendChild(cityParagraph);

    const countryParagraph = document.createElement("p");
    const newCountry = document.createTextNode(`Country: ${data[i].country}`);
    countryParagraph.appendChild(newCountry);
    newDiv.appendChild(countryParagraph);

    const regionParagraph = document.createElement("p");
    const newRegion = document.createTextNode(`Region: ${data[i].region}`);
    regionParagraph.appendChild(newRegion);
    newDiv.appendChild(regionParagraph);

    const populationParagraph = document.createElement("p");
    const newPopulation = document.createTextNode(`Population: ${data[i].population}`);
    populationParagraph.appendChild(newPopulation);
    newDiv.appendChild(populationParagraph);

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