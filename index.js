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
        const humidity = document.createElement('li');
        const wind = document.createElement('li');
        highTemp.textContent =  `HIGH: ${celsiusToF(Math.trunc(daysWeather.max_temp))}° F`;
        lowTemp.textContent = `LOW: ${celsiusToF(Math.trunc(daysWeather.min_temp))}° F,` 
        conditions.textContent = `CONDITIONS: ${sentenceCase(daysWeather.weather_state_name)}.`;
        humidity.textContent =  `HUMIDITY: ${Math.trunc(daysWeather.humidity)}%`;
        wind.textContent = `WIND SPEED: ${Math.trunc(daysWeather.wind_speed)} mph`;
        day.appendChild(highTemp);
        day.appendChild(lowTemp);
        day.appendChild(conditions);
        day.appendChild(humidity);
        day.appendChild(wind);
        selectDay++;
    }
}
//
function displayCurrentForecast (weatherData) {
    const currentForecast = weatherData.consolidated_weather[0]
    placeAndTime.textContent = `Forecast for ${weatherData.title}, ${weatherData.parent.title} today (${week[today]}, 
                                ${month[date.getMonth() + 1]} ${ddDay}, ${yyyyYear}):`
    todaysForecast.textContent = `Temperatures between ${celsiusToF(Math.trunc(currentForecast.min_temp))} 
                                and ${celsiusToF(Math.trunc(currentForecast.max_temp))}° F. 
                                ${sentenceCase(currentForecast.weather_state_name)}. 
                                ${Math.trunc(currentForecast.humidity)}% humidity. Winds reaching ${Math.trunc(currentForecast.wind_speed)} mph.`;
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


const donationForm = document.querySelector(".donation");
donationForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    const amountInput = e.target.newValue.value;
    addingAmount(amountInput)
    })


function addingAmount(amountInput){
    let startAmount = "";
    const amountUpdated = document.querySelector(".amountChange");
    amountUpdated.innerText = "";
    amountUpdated.innerText = `Amount $ ${amountInput + startAmount}`;
    return startAmount;
    }







// const baseURL = 'https://www.metaweather.com/api/location';
// let city = 'new%20york';
// // let city = 'new%20york';
// document.addEventListener('DOMContentLoaded', () => {
//     getLocation();
//     locationSearch ()
// })

// // // fetch One City Info
// function locationSearch (){
//     fetch(`${baseURL}/search/?query=new`)
//     .then(response => response.json())
//     .then(city => {
//         // getTitle (city)
//         updateCityList (city)    
//     })
// }

// // forEach city Info
// function updateCityList (city){
//     city.forEach(cityInfo => currentLocation(cityInfo))
// }
// // search submit
// // need to get info from different api url
// function currentLocation(cityInfo){
//     // city name variable
//     let currentLocation = cityInfo.title.toUpperCase();
// // purple section where the name of city will appear
//     const cityDisplaySection = document.querySelector("body > div.search-area > h2");
// // form create addEent
//     const form = document.querySelector("body > nav > div > form");
// // addEvent
// form.addEventListener('submit', (e) =>{
// // no refresh
//     e.preventDefault()
// // input where value is  being submitted
//     let input = e.target["city-name-zipcode"].value.toUpperCase();
// // if statement to check input and location match and dipsplay
//     if 
//     ((input[0] === currentLocation[0]) && (input[1] === currentLocation[1]) && (input[2] === currentLocation[2]) && (input[3] === currentLocation[3]) && (input[4] === currentLocation[4]) && (input[5] === currentLocation[5])) 
//         {
//         cityDisplaySection.innerText = "";
//         cityDisplaySection.innerText = `${currentLocation}`;
//     }
//     // else if (input[0] !== currentLocation[0])
//     //     {
//     //     cityDisplaySection.innerText = "";
//     //     cityDisplaySection.innerText = "No Data";
//     //     }
//      })   
// }

// // five days info from API
// function getLocation (){
//     fetch(`${baseURL}/44418/`)
//     .then(res => res.json())
//     .then(data => {
//         // console.log(data.consolidated_weather)
//         let weatherInfo = data.consolidated_weather;
//         updateList(weatherInfo)
//         todayWeather (weatherInfo) // use only current date data       
//         // console.log(weatherInfo)
//     });
// }
// // obj data converted into Array
// function updateList(weatherInfo){
//     weatherInfo.forEach(dailyWeather => {
//         // console.log(dailyWeather) // to see all info
//         // console.log(`Weather Status: ${dailyWeather.weather_state_name}`) // to see object value belongs to specific object key
//         fiveDays(dailyWeather)
//         // todayWeather (dailyWeather)
//     })
// }
// //display 5 days weather into HTML
// // DAILY forcaseSection
// function fiveDays(dailyWeather){
//     const dateOne = document.getElementById('date_one');
//     dateOne.innerText = "";
//     dateOne.innerText = Date();

//     const dateTwo= document.getElementById('date_two');
//     dateTwo.innerText ="";
//     dateTwo.innerText = Date()+1
// }
// // use current date data 
// // apply its data into the last part
// function todayWeather (weatherInfo) {
//     let todayWeather = weatherInfo[0];
// // add % sign at the end
//     let humidity = todayWeather.humidity;
// // need to change parseInt and fahrenheit
//     let maxTemp = Math.trunc(todayWeather.max_temp);
// // need to change parseInt and fahrenheit
//     let minTemp = Math.trunc(todayWeather.min_temp);
// // need to change parseInt
//     let visibility = Math.trunc(todayWeather.visibility);
// // need to change parseInt and miles 
//     let winSpeed = Math.trunc(todayWeather.wind_speed);  
// //temperature
//     const temperatureChart = document.querySelector("#temperate");
//         temperatureChart.innerText = "";
//         temperatureChart.innerText = `High : ${maxTemp} & Low: ${minTemp}`
// // humidity
//     const humidityChart = document.querySelector("#percentage");
//         humidityChart.innerText = "";
//         humidityChart.innerText = `Humidity : ${humidity} %`;
// // windSpeed
//     const winSpeedChart = document.querySelector("#kilometer");
//         winSpeedChart.innerText = "";
//         winSpeedChart.innerText = `Wind : ${winSpeed} Km/h`;
// // visibility
//     const visibilityChart = document.querySelector("#visibility");
//         visibilityChart.innerText = "";
//         visibilityChart.innerText = `Visibility : ${visibility}`;

// }

