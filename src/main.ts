import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML =`
  <div>
    <h1 class="headher">Contrio</h1>
    <div class="container">
      <div class="search-bar">
        <input class="search-input" type="text" placeholder="Search for city.." id="search">
        <button class="search-button" id="btn"><i class="fa-solid fa-magnifying-glass"></i></button>
		  </div>
    </div>
    <div class="slider-container">
      <div class="slider-box">
        <div>
          <p class="slider-paragraph">City</p>
        </div>
        <div class="slider-cell">
          <label class="switch">
            <input id="slider" type="checkbox" value="yes">
            <span class="slider round"></span>
          </label>
        </div>
        <div>
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
const btn = document.getElementById('btn') as HTMLInputElement;
const search = document.getElementById('search') as HTMLInputElement;
let text: string = "";
let checkBox: boolean;

btn.addEventListener('click', SliderCheck);
search.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    SliderCheck();
  }
});

const slider = document.getElementById('slider') as HTMLInputElement;
slider.addEventListener('click', SliderCheck);
SliderCheck()

function SliderCheck() {
  checkBox = document.querySelector('#slider:checked') !== null;

  if (checkBox == true) {
    SubmitCountry()
  }else{
    SubmitCity();
  }
}

function SubmitCity(): void {
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

    let CityData: City[] = [];

    for (let i = 0; i < response.data.length; i++) {
      const city: City = {
        name : response.data[i].name,
        country : response.data[i].country,
        region : response.data[i].region,
        population : response.data[i].population,
      }
      CityData[i] = city;
    }
    // console.log(CityData);

    ElementPusher(CityData)
  })
  .catch(err => console.error(err));
}

function SubmitCountry(): void {
  deleteGridChild();
  text = searchOutput.value;
  if (text == "") {
    text = "Slovakia";    
  }

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '31c5235490msha1fb83c9e91f9d4p193520jsn67bdd3fc1f71',
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
  };
  
  fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/countries?limit=10&namePrefix=${text}`, options)
    .then(response => response.json())
    .then(async response => {
      
      let countryCode: String[] = [];

      for (let i = 0; i < response.data.length; i++) {
        const cCode:string = response.data[i].code;
        countryCode[i] = cCode;
      }
      // console.log(countryCode);

      await delay(1300);

      for (let i = 0; i < countryCode.length; i++) {
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': '31c5235490msha1fb83c9e91f9d4p193520jsn67bdd3fc1f71',
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
          }
        };
        
        fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${countryCode[i]}`, options)
        .then(response => response.json())
        .then(response => {
          console.log(response)
        
          // To be continued...
        })
        .catch(err => console.error(err));

        await delay(1500);
      }
    })
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

function delay(ms:number){
  return new Promise(resolve => {
      setTimeout(resolve, ms);
  });
}