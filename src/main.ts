import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML =`
  <div>
    <div class="navigation-flex">
      <h1 class="headher">Contrio</h1>
        <div class="search-bar">
          <input class="search-input" type="text" placeholder="Search.." id="search">
          <button class="search-button" id="btn"><i class="fa-solid fa-magnifying-glass"></i></button>
        </div>
        <div class="slider-box">
          <div>
            <p id="city" class="slider-paragraph"></p>
          </div>
          <div class="slider-cell">
            <label class="switch">
              <input id="slider" type="checkbox" value="yes">
              <span class="slider round"></span>
            </label>
          </div>
          <div>
            <p id="country" class="slider-paragraph"></p>
          </div>
        </div>
    </div>
      <div id="grid" class="country-grid">
  </div>`

type City = {
  name : string;
  country : string;
  region : string;
  population : number;
}

type Country = {
  name : string;
  capital : string;
  currency : string;
  flag : URL;
  regions : number;
  callingCode : number;
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
  document.getElementById('country')!.innerText = "";
  document.getElementById('city')!.innerText = "";
  if (checkBox == true) {
    document.getElementById('country')!.innerText = "Country";
    SubmitCountry()
  }else{
    document.getElementById('city')!.innerText = "City";
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
      CityData[i] = {
        name : response.data[i].name,
        country : response.data[i].country,
        region : response.data[i].region,
        population : response.data[i].population
      }
    }
    // console.log(CityData);
    if (CityData[0] == null) {
      confirm("This city doesn't exist")
    }
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
      
      await delay(1300);

      let CountryData: Country[] = [];
      
      for (let i = 0; i < response.data.length; i++) {
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': '31c5235490msha1fb83c9e91f9d4p193520jsn67bdd3fc1f71',
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
          }
        };
        
        fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${response.data[i].code}`, options)
        .then(response => response.json())
        .then(response => {

            const country: Country = {
            name : response.data.name,
            capital : response.data.capital,
            currency : response.data.currencyCodes[0],
            flag : response.data.flagImageUri,
            regions : response.data.numRegions,
            callingCode : response.data.callingCode,
          }
          CountryData[i] = country;
        })
        .catch(err => console.error(err));

        await delay(1500);
      }
      // console.log(CountryData);

      if (CountryData[0] == null) {
        confirm("This country doesn't exist")
      }
      CountryElementPusher(CountryData);
    })
    .catch(err => console.error(err));

}

function ElementPusher(data : Array<City>) : void {
  for (let i = 0; i < data.length; i++) {
    const newDiv= document.createElement("div");

    const cityParagraph = document.createElement("p");
    const newCity = document.createTextNode(`${data[i].name}`);
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

function CountryElementPusher(data : Array<Country>) {
  for (let i = 0; i < data.length; i++) {
    
    const newDiv = document.createElement("div");
    
    for (let j = 0; j < 5; j++) {
      const newParagraph = document.createElement("p");
      let myCountry:Text;
      if (j == 0) {
        myCountry = document.createTextNode(`${data[i].name}`);
      }else if (j == 1) {
        myCountry = document.createTextNode(`Capital: ${data[i].capital}`);
      }else if (j == 2) {
        myCountry = document.createTextNode(`Currency: ${data[i].currency}`);
      }else if (j == 3) {
        myCountry = document.createTextNode(`Regions: ${data[i].regions}`);
      }else if (j == 4) {
        myCountry = document.createTextNode(`CallingCode: ${data[i].callingCode}`);
      }
      newParagraph.appendChild(myCountry);
      newDiv.appendChild(newParagraph);
    }
    const imageDiv = document.createElement("div");
    const countryFlag = document.createElement("img");
    countryFlag.src = `${data[i].flag}`;
    imageDiv.appendChild(countryFlag);
    newDiv.appendChild(imageDiv);

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