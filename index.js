
// IDEA : 
// Look up and comment on weather forecast by city

// HTML

// JAVASCRIPT FUNCTIONALITY :
// DOMContentLoaded : display forecast for a certain location on the current date
// Click : ‘like’ or ‘dislike’ weather
// Submit : enter date + location for forecast lookup and comment on the forecast 

// CSS


fetch('https://www.metaweather.com/api/location/search/?query=san')
.then(response => response.json())
.then(data => {
  console.log(data)
})

