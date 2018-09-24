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

function CountryObj(country) {
    this.name = country.name;
    this.region = country.region;
    this.subregion = country.subregion;
    this.capital = country.capital;
    this.langauges = country["languages"][0]["name"];
    this.population = country.population;
    this.currencies = country.currencies[0]["symbol"];
    this.flag = country.flag;
}

const extractCountryData = countries => {
    return countries.reduce((acc, country, index) => {
    acc[index] = new CountryObj(country);
    return acc;
    }, []);
}

const displayCountries = countryData => {

    countryData.forEach( country => {
        let country_div = document.createElement('div');
        country_div.setAttribute('class','countryDiv');
        let img_top_div = document.createElement('div');
        let country_ul = document.createElement('ul');
        country_ul.setAttribute('class','country_ul');
 
        for(let key in country){
            
            let country_li = document.createElement('li');
            let value_p = document.createElement('p');

            
            if(key !== "name"){
                let key_span = document.createElement('span');
                key_span.setAttribute('class','key_span');
                key_span.textContent = key;
                country_li.appendChild(key_span);
            } else {
                value_p.classList.add("name_value");
            }

            if(key === "flag") {
                let img = document.createElement('img');
                img.src = country[key];
                img.setAttribute('class','flagImg');
                img_top_div.appendChild(img);
                country_div.appendChild(img_top_div);
            } else {
                value_p.textContent =country[key];
                country_li.appendChild(value_p);
                country_ul.appendChild(country_li);
            }    
        }
        country_div.appendChild(country_ul);
        search_Results.appendChild(country_div);  
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

        /*
        countries.forEach(element => {
            document.querySelector('body').insertAdjacentHTML(
                'afterbegin', 
                `
                    <td>${element.name}</td>
                    <td>${element.region}</td>
                    <td></td>
                `
            );
        })*/
        displayCountries(extractCountryData(countries));
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

