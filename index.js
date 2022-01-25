const baseURL = 'https://www.metaweather.com/api/location/';
let locationInput = "new%20york"

function setFormattedLocation (str) {
    locationInput = str.replace(' ', '%20') 
}

// form create addEent
const form = document.querySelector(".area-check");
const input = document.querySelector("input.search")
// addEvent
form.addEventListener('submit', (e) => {
        e.preventDefault()
        setFormattedLocation(input.value);
        lookUpByLocation();
        form.reset();
})


const date = new Date();
const today = date.getDay();
const yyyyYear = date.getFullYear();
const mmMonth = date.getMonth() > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
let ddDay = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
const week = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
};

const month = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December"
};

const placeAndTime = document.querySelector('.place-and-time');
const todaysForecast = document.querySelector('#todays-forecast');

const weekdays = document.querySelectorAll('span.dayOfWeek');
const fiveDayForecast = document.querySelectorAll('.forecast-card');

let nextDay = 0;
for (day of weekdays){
    day.textContent = week[(today + nextDay) % 7]
    nextDay++;
}


//Initially populate with weather icons, replace with weather on search.

document.addEventListener('DOMContentLoaded', () => {
    lookUpByLocation();
});

function lookUpByLocation () {
    fetch(`${baseURL}search/?query=${locationInput}`)
    .then(res => res.json())
    .then(data => {
        getWeatherData(data);
        console.log(data)
    })
    .catch(error => {
        alert("Sorry, we don't have data on that location. Please try another!");
        form.reset();
})
}

function getWeatherData (inData) {
    fetch(`${baseURL}${inData[0].woeid}`)
    .then(res => res.json())
    .then(outData => {
        console.log(outData);
        displayCurrentForecast(outData);
        displayFiveDayForecast(outData);
        // displayFiveDayForecast
        // placeAndTime.textContent = 
        // `Forecast for ${outData.parent.title}, ${week[today]}, ${month[date.getMonth() + 1]} ${ddDay}, ${yyyyYear}:`
        console.log(outData.consolidated_weather[0])
        // todaysForecast.textContent = `${}`
    })
}

function displayFiveDayForecast (weatherData) {
    let selectDay = 0;
    for (day of fiveDayForecast) {
        day.textContent = week[(today + selectDay) % 7]; 
        const daysWeather = weatherData.consolidated_weather[selectDay];
        const highTemp = document.createElement('li');
        const lowTemp = document.createElement('li');
        const conditions = document.createElement('li');
        highTemp.textContent =  `HIGH: ${celsiusToF(Math.trunc(daysWeather.max_temp))}° F`;
        lowTemp.textContent = `LOW: ${celsiusToF(Math.trunc(daysWeather.min_temp))}° F,` 
        conditions.textContent = `CONDITIONS: ${sentenceCase(daysWeather.weather_state_name)}.`;
        day.appendChild(highTemp);
        day.appendChild(lowTemp);
        day.appendChild(conditions);
        selectDay++;
    }
}

function displayCurrentForecast (weatherData) {
    const currentForecast = weatherData.consolidated_weather[0]
    placeAndTime.textContent = `Forecast for ${weatherData.title} today (${week[today]}, 
                                ${month[date.getMonth() + 1]} ${ddDay}, ${yyyyYear}):`
    todaysForecast.textContent = `HIGH: ${celsiusToF(currentForecast.max_temp)}° F
                                LOW: ${celsiusToF(currentForecast.min_temp)}° F, 
                                CONDITIONS: ${sentenceCase(currentForecast.weather_state_name)}.`;
}

function sentenceCase (string) {
    return string[0].concat(string.slice(1).toLowerCase())
}

function celsiusToF (temp) {
    return (temp * 9/5) + 32; 
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

