// elements
const SearchCountry = document.querySelector("#SearchCountry")
const searchBtn = document.querySelector("#searchBtn")
const errorinfo = document.querySelector(".errorinfo")
const countryName = document.querySelector(".countryName")
const CapitalCity = document.querySelector(".CapitalCity")
const Population = document.querySelector(".Population")
const Life = document.querySelector(".Life")
const TotalCases = document.querySelector("#TotalCases")
const TotalRecoveries = document.querySelector("#TotalRecoveries")
const TotalDeaths = document.querySelector("#TotalDeaths")
const FullyVaccinated = document.querySelector("#FullyVaccinated")
const PartialVacc = document.querySelector("#PartialVacc")
const PercVaccinated = document.querySelector("#PercVaccinated")
const DataTable = document.querySelector(".DataTable")

// events
searchBtn.addEventListener("click", GetCountryData)


// functions

window.onload = function(){
    GetAfricaCases()
}

// gets user input and gets data for the entered country
function GetCountryData(){
    let CountryName = SearchCountry.value
    if(CountryName != ""){
        CasesApiReq(CountryName);
        VaccinesApiReq(CountryName);
        errorinfo.textContent = "";
        SearchCountry.value="";
    }else{
        errorinfo.textContent = "Error: Enter Country Name"
    }
}


// cases api request
function CasesApiReq(Country){
    fetch(`https://covid-api.mmediagroup.fr/v1/cases?country=${Country}`)
    .then(response=>response.json())
    .then(data=>{
        let results = [data];
        results = results[0].All
        countryName.textContent = results.country
        CapitalCity.textContent = results.capital_city
        Population.textContent = results.population
        Life.textContent = results.life_expectancy
        TotalCases.textContent = ZeroCheck(results.confirmed)
        TotalRecoveries.textContent = ZeroCheck(results.recovered)
        TotalDeaths.textContent = ZeroCheck(results.deaths)
    }).catch(err=>{
        console.log(err);
    })
}

// vaccines api request
function VaccinesApiReq(Country){
    fetch(`https://covid-api.mmediagroup.fr/v1/vaccines?country=${Country}`)
    .then(response=>response.json())
    .then(data=>{
        let results = [data];
        results = results[0].All
        FullyVaccinated.textContent = results.people_vaccinated
        PartialVacc.textContent = results.people_partially_vaccinated
        let PVCC = (results.people_vaccinated/results.population)*100;
        PercVaccinated.textContent  = `${PVCC.toFixed(2)}%`;

    }) 
    .catch(err=>{
        console.log(err);
    })
}

// make 0 an error of data not available

function ZeroCheck(num){
    if(num==0){
        return("No Data")
    }else{
     
        return num
    }
}


// array to create statisticas for all countries
function CreateLi(element){

       let List =  DataTable.querySelector("ul")
       let newListItem = document.createElement("li")

       newListItem.innerHTML = `
       <div class="CountryData">${element.country}</div>
       <div class="CasesData">${element.confirmed}</div>
       <div class="DeathsData">${element.deaths}</div>
       `;

       List.appendChild(newListItem)
}


// africa data
function GetAfricaCases(){
	let results;
    fetch(`https://covid-api.mmediagroup.fr/v1/cases?continent=Africa`)
    .then(response=>response.json())
    .then(data=>{
        results = [data];
		results = results[0]
		LoopObject(results)
    }) 
    .catch(err=>{
        console.log(err);
    })
}

// loop an object and return its properties
function LoopObject(obj){
	for (var i = 0 in obj) {
	// console.log(obj[i].All.country);
	CreateLi(obj[i].All)
	}
}
