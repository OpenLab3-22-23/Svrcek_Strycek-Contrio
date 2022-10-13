import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML =`
  <div>
    <h1>Contrio</h1>
    <input type="text" placeholder="Search..">
    <br>
    <div class="countrybutton">
      <button>Country 1</button>
      <button>Country 1</button>
      <button>Country 1</button>
      <button>Country 1</button>
      <button>Country 1</button>
      <button>Country 1</button>
    <div>
  </div>`

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '31c5235490msha1fb83c9e91f9d4p193520jsn67bdd3fc1f71',
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	}
};

fetch('https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));	