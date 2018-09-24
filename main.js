console.log("hello");

const url = 'https://restcountries.eu/rest/v2/all';

let search_Result = document.querySelector('.search_Result');
console.log(search_Result);

const displayContents = countries => {
    let div;
    countries.forEach(country => {
        div = document.createElement('div');
        div.textContent = country.name;
        search_Result.appendChild(div);
    })
}

const fetchData = (url, displayContentsFn) =>{
    
    fetch(url)
    .then(response => response.json())
    .then(countries => {

        displayContentsFn(countries);


        /*let div;
        countries.forEach(country => {
            div = document.createElement('div');
            div.textContent = country.name;
            document.body.appendChild(div);
        })*/
    })
}

fetchData(url, displayContents);

