const url = 'https://restcountries.eu/rest/v2/all';

/*name,capital,population,region, subregion,languages,currencies, flag*/


let search_Results = document.querySelector('.search_Results');

/*
let search_Result = document.querySelector('.search_Result');
let search_byName = document.querySelector('.search_byName');
let search_byCapital = document.querySelector('.search_byCapital');
let search_byRegion = document.querySelector('.search_byRegion');
let search_byLang = document.querySelector('.search_byLang');
let search_byCurrencies = document.querySelector('.search_byCurrencies');
let search_byPopulation = document.querySelector('.search_byPopulation');
let search_byTimezone = document.querySelector('.search_byTimezone');
let search_byFlag = document.querySelector('.search_byFlag');
*/

function CountryObj(country){
    this.name = country.name;
    this.region = country.region;
    this.subregion = country.subregion;
    this.capital = country.capital;
    this.langauges = country["languages"][0]["name"];
    this.currencies = country.currencies;
    this.flag = country.flag;
}

const extractCountryData = countries => {
    let extractedCountryData = [];

    countries.forEach((country, index) => {
       extractedCountryData[index] = new CountryObj(country);
    })
    displayCountries(extractedCountryData);
    console.log(extractedCountryData);

} 

const displayCountries = countryData => {

    countryData.forEach( country => {
        let div = document.createElement('div');
        div.textContent = `${country.name}`
        search_Results.appendChild(div);  
    })
}

/*
const displayContents = (countries, lookfor, resultDiv, ObjPro) => {
    
    countries.forEach(country => {
        let div;
        div = document.createElement('div');
       
        (typeof country[lookfor] == "object") ? 
        ((ObjPro == 0) ? (div.textContent = country[lookfor][0]) : (div.textContent = country[lookfor][0][ObjPro])) 
        : (div.textContent = country[lookfor]); 
        resultDiv.appendChild(div);
        search_Result.appendChild(resultDiv);    
    })
}

const displayImages = (countries, lookfor, resultDiv) => {

    countries.forEach(country => {
        let img = document.createElement('img');
        img.setAttribute('src', country[lookfor]);
        img.setAttribute('width', '100px');
        img.setAttribute('height','100px');
        console.log(img.src);
        resultDiv.appendChild(img);
        search_Result.appendChild(resultDiv);    
    })
}
*/

//const fetchData = (url, displayContentsFn, displayImagesFn) =>{
const fetchData = (url) =>{

    fetch(url)
    .then(response => response.json())
    .then(countries => {

        extractCountryData(countries);
        /*
        displayContentsFn(countries, "name", search_byName);
        displayContentsFn(countries, "region", search_byRegion);
        displayContentsFn(countries, "capital", search_byCapital);
        displayContentsFn(countries, "languages", search_byLang, "name");
        displayContentsFn(countries, "currencies", search_byCurrencies, "symbol");
        displayContentsFn(countries, "population", search_byPopulation);
        // the last parameter 0 means no object property. Only array exist.
        displayContentsFn(countries, "timezones", search_byTimezone, 0);
        displayImagesFn(countries, "flag", search_byFlag);
        //displayContentsFn(countries, "capital", search_byCapital);
        //displayContentsFn(countries, "capital", search_byCapital);
        //displayContentsFn(countries, "capital", search_byCapital);
       */

        /*let div;
        countries.forEach(country => {
            div = document.createElement('div');
            div.textContent = country.name;
            document.body.appendChild(div);
        })*/
    })
}

//fetchData(url, displayContents, displayImages);

fetchData(url);

