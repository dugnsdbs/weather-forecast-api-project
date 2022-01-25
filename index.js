const baseURL = 'https://www.metaweather.com/api/location';
let city = 'new%20york';
// let city = 'new%20york';
document.addEventListener('DOMContentLoaded', () => {
    getLocation();
    locationSearch ()
})

// // fetch One City Info
function locationSearch (){
    fetch(`${baseURL}/search/?query=n`)
    .then(response => response.json())
    .then(city => {
        // getTitle (city)
        updateCityList (city)    
    })
}

// forEach city Info
function updateCityList (city){
    city.forEach(cityInfo => currentLocation(cityInfo))
}
// search submit
// need to get info from different api url
function currentLocation(cityInfo){
    // city name variable
    let location = cityInfo.title
    let currentLocation = location.toLowerCase();
// purple section where the name of city will appear
    const cityDisplaySection = document.querySelector("body > div.search-area > h2");
// form create addEent
    const form = document.querySelector("body > nav > div > form");
// addEvent
form.addEventListener('submit', (e) =>{
// no refresh
    e.preventDefault()
// input where value is  being submitted
    let input = e.target["city-name-zipcode"].value;
// if statement to check input and location match and dipsplay
    if 
    ((input[0] === currentLocation[0]) && (input[1] === currentLocation[1]) && (input[2] === currentLocation[2]) && (input[3] === currentLocation[3]) && (input[4] === currentLocation[4]) && (input[5] === currentLocation[5])) 
    {
        cityDisplaySection.innerText = "";
    cityDisplaySection.innerText = `${currentLocation}`;
         }
     })   
}

// five days info from API
function getLocation (){
    fetch(`${baseURL}/44418/`)
    .then(res => res.json())
    .then(data => {
        // console.log(data.consolidated_weather)
        let weatherInfo = data.consolidated_weather;
        updateList(weatherInfo)
        todayWeather (weatherInfo) // use only current date data       
        // console.log(weatherInfo)
    });
}
// obj data converted into Array
function updateList(weatherInfo){
    weatherInfo.forEach(dailyWeather => {
        // console.log(dailyWeather) // to see all info
        // console.log(`Weather Status: ${dailyWeather.weather_state_name}`) // to see object value belongs to specific object key
        fiveDays(dailyWeather)
        // todayWeather (dailyWeather)
    })
}
//display 5 days weather into HTML
// DAILY forcaseSection
function fiveDays(dailyWeather){
    const dateOne = document.getElementById('date_one');
    dateOne.innerText = "";
    dateOne.innerText = Date();

    const dateTwo= document.getElementById('date_two');
    dateTwo.innerText ="";
    dateTwo.innerText = Date()+1
}
// use current date data 
// apply its data into the last part
function todayWeather (weatherInfo) {
    let todayWeather = weatherInfo[0];
// add % sign at the end
    let humidity = todayWeather.humidity;
// need to change parseInt and fahrenheit
    let maxTemp = Math.trunc(todayWeather.max_temp);
// need to change parseInt and fahrenheit
    let minTemp = Math.trunc(todayWeather.min_temp);
// need to change parseInt
    let visibility = Math.trunc(todayWeather.visibility);
// need to change parseInt and miles 
    let winSpeed = Math.trunc(todayWeather.wind_speed);  
//temperature
    const temperatureChart = document.querySelector("#temperate");
        temperatureChart.innerText = "";
        temperatureChart.innerText = `High : ${maxTemp} & Low: ${minTemp}`
// humidity
    const humidityChart = document.querySelector("#percentage");
        humidityChart.innerText = "";
        humidityChart.innerText = `Humidity : ${humidity} %`;
// windSpeed
    const winSpeedChart = document.querySelector("#kilometer");
        winSpeedChart.innerText = "";
        winSpeedChart.innerText = `Wind : ${winSpeed} Km/h`;
// visibility
    const visibilityChart = document.querySelector("#visibility");
        visibilityChart.innerText = "";
        visibilityChart.innerText = `Visibility : ${visibility}`;

}

