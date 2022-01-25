const baseURL = 'https://www.metaweather.com/api/location';
let city = 'new%20york';

document.addEventListener('DOMContentLoaded', () => {
    fetch(`${baseURL}/search/?query=${city}`)
    .then(res => res.json())
    .then(data => console.log(data));
})





// IDEA : 
// Look up and comment on weather forecast by city

// HTML

// JAVASCRIPT FUNCTIONALITY :
// DOMContentLoaded : display forecast for a certain location on the current date
// Click : ‘like’ or ‘dislike’ weather
// Submit : enter date + location for forecast lookup and comment on the forecast 

// CSS
