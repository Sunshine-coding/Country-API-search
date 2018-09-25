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
    return acc;
  }, []);
};

// Sort the country data
const sortWithAscending = countries => {
    //To prevent side effects which means change the original country array
    const newcountries = [...countries];
    const sortedCountries = newcountries.sort((a, b) => {

        let nameA = a.name.toUpperCase(); // ignore upper and lowercase
        let nameB = b.name.toUpperCase();
        if(nameA < nameB) {
            return -1
        }
        else if (nameA > nameB){
            return 1;
            
        } else if (nameA = nameB){
            return  0;
        }  
    });
    return sortedCountries; 
}

const sortWithDescending = countries => {
    //To prevent side effects which means change the original country array
    const newcountries = [...countries];
    const sortedCountries = newcountries.sort((a, b) => {

        let nameA = a.name.toUpperCase(); // ignore upper and lowercase
        let nameB = b.name.toUpperCase();

        if(nameA < nameB) {
            return 1
        }
        else if (nameA > nameB){
            return -1;

        } else if (nameA = nameB){
            return  0;
        }  
        
    });
    return sortedCountries; 
}

// Display the country data
const displayCountries = () => {
  
  let searchedCountries = searchCountries(countries_data);

  if (document.querySelector('#ascending_sort').checked) {
    sortedCountries = sortWithAscending(searchedCountries);
  } else if (document.querySelector('#descending_sort').checked) {
    sortedCountries = sortWithDescending(searchedCountries);
  }

  let filteredResult = document.querySelector(".filteredResult"); 
  markupForResult = `The total Countries are <span class="countCountries">${sortedCountries.length}</span>`;
  filteredResult.insertAdjacentHTML("afterbegin", markupForResult);

  sortedCountries.forEach(country => {
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
    console.log("type", (typeof search_input));
  
  //Clean the result before display new result
  search_Results.innerHTML = "";
  //if (!numbers.test(search_input)) {
    console.log(search_input);
    let filteredCountries;

    filteredCountries = countries.filter(countryObj => {
        return Object.values(countryObj)
             .join("")
             .toLowerCase()
             .includes(search_input);
    });

    // document.querySelector(".search_input").value = "";
    return filteredCountries;
};

const search_input = document.querySelector(".search_input");

let countries_data = null;

const fetchData = url => {
  fetch(url)
    .then(response => response.json())
    .then(countries => {

      countries_data = extractCountryData(countries);
      //As default, it displays every countries in data
      //displayCountries(extractCountryData(countries));
      displayCountries();
      
    });
};

document.querySelector('#ascending_sort').addEventListener("click", ()=>{
  displayCountries();
});

document.querySelector('#descending_sort').addEventListener("click", ()=>{
  displayCountries();
});

//When search input is typed, it starts to search
search_input.addEventListener("keyup", ()=>{
  displayCountries();
});

fetchData(url);
