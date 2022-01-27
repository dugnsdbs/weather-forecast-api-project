const baseURL = 'https://www.metaweather.com/api/location/';
let locationInput = "new%20york"
let currentCity;
let currentCityLocation;

function setFormattedLocation (str) {
    locationInput = str.replace(' ', '%20') 
}

function roundOff (temp) {
    return Math.round((temp + Number.EPSILON) * 100) / 100
}

const form = document.querySelector(".area-check");
const input = document.querySelector("input.search")

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

const weatherStates = {
    sn: '🌨️',
    sl: '🌧️🌧️',
    h:'⛈️',
    t: '⛈️',
    hr:'🌧️🌧️',
    lr:'🌧️',
    s: '🌧️⛅',
    hc: '☁️☁️',
    lc: '☁️',
    c: '☀️'
}

const placeAndTime = document.querySelector('.place-and-time');
const todaysForecast = document.querySelector('#todays-forecast.marquee');
const fiveDayForecast = document.querySelectorAll('div .forecast-card');
const commentsBox = document.querySelector('.commentSubmittedBox')
const tyMessage = document.querySelector('#thankYouMessage');
let fiveDayForecastBannerText = document.querySelector('.five-days-title').textContent;

document.addEventListener('DOMContentLoaded', () => {
    lookUpByLocation();
});

function lookUpByLocation () {
    fetch(`${baseURL}search/?query=${locationInput}`)
    .then(res => res.json())
    .then(data => {
        getWeatherData(data);
    })
    .catch(error => {
        alert("Either there's been an error or we don't have data on that location. Please try again.");
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
const dayOfWeek = document.querySelectorAll('.dayOfWeek');
const weatherImgs = document.querySelectorAll('.weather-img'); 
const fiveDayData = document.querySelectorAll('.fullWeatherData')
// const fiveDayDataDisplay

function displayFiveDayForecast (weatherData) {
    let selectDay = 0;
    for (day of fiveDayForecast) {
        const daysWeather = weatherData.consolidated_weather[selectDay];
        const highTemp = document.createElement('li');
        const lowTemp = document.createElement('li');
        const conditions = document.createElement('li');
        const humidity = document.createElement('li');
        const wind = document.createElement('li');
        fiveDayData[selectDay].textContent = '';
        dayOfWeek[selectDay].innerHTML = `<strong>${week[(today + selectDay) % 7]}</strong>`; 
        highTemp.innerHTML =  `<strong>HIGH:</strong> ${roundOff(celsiusToF(daysWeather.max_temp))}° F`;
        lowTemp.innerHTML = `<strong>LOW:</strong> ${roundOff(celsiusToF(daysWeather.min_temp))}° F,` 
        conditions.innerHTML = `<strong>CONDITIONS:</strong> ${sentenceCase(daysWeather.weather_state_name)}.`;
        humidity.innerHTML =  `<strong>HUMIDITY:</strong> ${roundOff(daysWeather.humidity)}%`;
        wind.innerHTML = `<strong>WIND SPEED:</strong> ${roundOff(daysWeather.wind_speed)} mph`;
        weatherImgs[selectDay].src = `https://www.metaweather.com/static/img/weather/${daysWeather.weather_state_abbr}.svg`;
        fiveDayData[selectDay].appendChild(highTemp);
        fiveDayData[selectDay].appendChild(lowTemp);
        fiveDayData[selectDay].appendChild(conditions);
        fiveDayData[selectDay].appendChild(humidity);
        fiveDayData[selectDay].appendChild(wind);
        selectDay++;
    }
    fiveDayForecastBannerText += (weatherStates[weatherData.consolidated_weather[0].weather_state_abbr]); 
}
//
function displayCurrentForecast (weatherData) {
    const thisForecast = weatherData.consolidated_weather[0];
    currentCity = weatherData.title;
    currentCityLocation = weatherData.parent.title;
    placeAndTime.textContent = `Forecast for ${weatherData.title}, ${weatherData.parent.title} today, ${week[today]} 
                                ${month[date.getMonth() + 1]} ${ddDay}, ${yyyyYear}:`
    todaysForecast.textContent = `TEMPERATURES FROM ${roundOff(celsiusToF(thisForecast.min_temp))}–${roundOff(celsiusToF(thisForecast.max_temp))}° F...${thisForecast.weather_state_name.toUpperCase()}...${roundOff(thisForecast.humidity)}% HUMIDITY...WINDS REACHING ${roundOff(thisForecast.wind_speed)} MPH...`;
}

function sentenceCase (string) {
    return string[0].concat(string.slice(1).toLowerCase())
}

function celsiusToF (temp) {
    return (temp * 9/5) + 32; 
}

const donationForm = document.querySelector("form.donation");
donationForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    const amountInput = e.target.newValue.value;
    addingAmount(amountInput)
    donationForm.reset();
    })

let totalDonations = 0;
function addingAmount(amountInput){
    const amountUpdated = document.querySelector(".amountChange");
    totalDonations += parseInt(amountInput);
    amountUpdated.innerHTML = `Thank you! Total Donations:<br> <span class ="blinking"> $${totalDonations}</span>!`;
    }

const commentForm = document.querySelector("form.commentForm");
commentForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const commentInput = e.target.comments.value;
    addingComment(commentInput)
    commentForm.reset();
})

function addingComment(commentInput){
    const paragraphComment = document.createElement('p');
    paragraphComment.innerHTML = `<em>Anonymous comment on the forecast for ${currentCity}, ${currentCityLocation}:</em> <br><br> ${commentInput}<br><br>`;
    commentsBox.style.display = 'block';
    commentsBox.appendChild(paragraphComment);

    const btn = document.createElement('button');
    btn.innerText = "delete";
    paragraphComment.appendChild(btn);

    btn.addEventListener('click', clickDelete)
}
function clickDelete(e){
    e.preventDefault();
    e.target.parentNode.remove();
}