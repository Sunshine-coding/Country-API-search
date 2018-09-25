const url = "https://restcountries.eu/rest/v2/all";

/*name,capital,population,region, subregion,languages,currencies, flag*/
let search_Results = document.querySelector(".search_Results");

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
    console.log(acc);
    return acc;
  }, []);
};

const displayCountries = countryData => {

  let filteredResult = document.querySelector(".filteredResult"); 
  markupForResult = `The total Countries are <span class="countCountries">${countryData.length}</span>`;
  filteredResult.insertAdjacentHTML("afterbegin", markupForResult);

  countryData.forEach(country => {
    let country_div = document.createElement("div");
    country_div.setAttribute("class", "countryDiv");
    let img_top_div = document.createElement("div");
    let country_ul = document.createElement("ul");
    country_ul.setAttribute("class", "country_ul");

    for (let key in country) {
      let country_li = document.createElement("li");
      let value_p = document.createElement("p");

      if (key !== "name") {
        let key_span = document.createElement("span");
        key_span.setAttribute("class", "key_span");
        key_span.textContent =
          key.charAt(0).toUpperCase() + key.slice(1, key.length);
        country_li.appendChild(key_span);
      } else {
        value_p.classList.add("name_value");
      }

      if (key === "flag") {
        let img = document.createElement("img");
        img.src = country[key];
        img.setAttribute("class", "flagImg");
        img_top_div.appendChild(img);
        country_div.appendChild(img_top_div);
      } else {
        value_p.textContent = country[key];
        country_li.appendChild(value_p);
        country_ul.appendChild(country_li);
      }
    }
    country_div.appendChild(country_ul);
    search_Results.appendChild(country_div);
  });
};

// search by any words
const searchCountries = countries => {
    console.log("test", countries);
  document.querySelector(".filteredResult").innerHTML = "";

  let search_input = document.querySelector(".search_input").value.toLowerCase();
  let filteredResult = document.querySelector(".filteredResult");
    console.log("type", (typeof search_input));
  //let numbers = /[0-9]/g;
  
  //Clean the result before display new result
  search_Results.innerHTML = "";
  //if (!numbers.test(search_input)) {
    console.log(search_input);
    let filteredCountries;
    let markupForResult;

    filteredCountries = countries.filter(countryObj => {
        if(countryObj["name"].toLowerCase().includes(search_input))
        return countryObj;
    });

    document.querySelector(".search_input").value = "";
    return filteredCountries;
//   } else {
//     alert("Please type an first Letter/words to search :)");
//   }
};

const searchBtn = document.querySelector(".search_btn");

const fetchData = url => {
  fetch(url)
    .then(response => response.json())
    .then(countries => {
      
      displayCountries(extractCountryData(countries));
      searchBtn.addEventListener("click", ()=>{
        displayCountries(searchCountries(extractCountryData(countries)));
      }); 
    });
};

fetchData(url);
