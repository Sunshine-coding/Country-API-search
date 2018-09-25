const url = 'https://restcountries.eu/rest/v2/all';

/*name,capital,population,region, subregion,languages,currencies, flag*/
let search_Results = document.querySelector('.search_Results');

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
                key_span.textContent = key.charAt(0).toUpperCase()+ key.slice(1, key.length);
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

const fetchData = (url) =>{

    fetch(url)
    .then(response => response.json())
    .then(countries => {

        displayCountries(extractCountryData(countries));

    })
}

fetchData(url);
