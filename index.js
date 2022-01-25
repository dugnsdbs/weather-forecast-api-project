const baseURL = 'https://www.metaweather.com/api/location';
let city = 'new%20york';

document.addEventListener('DOMContentLoaded', () => {
    getLocation();


})

// five days info from API
function getLocation (){
    fetch(`${baseURL}/44418/`)
    .then(res => res.json())
    .then(data => {
        // console.log(data.consolidated_weather)
        let weatherInfo = data.consolidated_weather;
        updateList(weatherInfo)
    });
}
// obj data converted into Array
function updateList(weatherInfo){
    weatherInfo.forEach(dailyWeather => {
        console.log(dailyWeather) // to see all info
        console.log(`Weather Status: ${dailyWeather.weather_state_name}`) // to see object value belongs to specific object key
        fiveDays(dailyWeather)})
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



