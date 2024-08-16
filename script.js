document.addEventListener('DOMContentLoaded', function() {
    
    // Defining Buttons and Inputs for citis Names
    const searchCityInput = document.getElementById('search-city-input');
    const searchCityButton = document.getElementById('search-city-button');
    const cityButtonsName = document.querySelectorAll('.city-button-name');
    // Defining Error Handelrs
    const ErrorText = document.getElementById('search-error');
    // Defining Ctity Info header
    const cityDayStatus = document.getElementById('day-status');
    const cityName = document.getElementById('city-name');
    const countryName = document.getElementById('country-name');
    const cityTime = document.getElementById('city-time');
    const cityDate = document.getElementById('city-date');
    // Tools Button 
    const mapButton = document.getElementById('map-button');
    const refreshButton = document.getElementById('refresh-button');
    // Defining Current temp info
    const currentTemp = document.getElementById('current-temp');
    const weatherStatusImg = document.getElementById('weather-status-img');
    const weatherStatus = document.getElementById('weather-status');
    // Defining Wind info
    const windDirImg = document.getElementById('wind-dir-img');
    const windDir = document.getElementById('wind-dir');
    const windSpeed = document.getElementById('wind-speed');
    // Defining Misc info
    const humidity = document.getElementById('humidity');
    const uvLight = document.getElementById('uv-light');

    let cityValueName = 'Amman';

    // Getting the City name value

    cityButtonsName.forEach(function(button) {
        button.addEventListener('click', function() {
            let buttonChild = button.children[1];
            cityValueName = buttonChild.innerHTML;
        })
    })
    searchCityButton.addEventListener('click', function() {
        if(searchCityInput.vlaue === ''){
            return;
        } else {
            cityValueName = searchCityInput.value;
        }
    })
    searchCityInput.addEventListener('keydown', function(button) {
        if(button.key === 'Enter'){
            if(searchCityInput.value === ''){
                return;
            } else {
                cityValueName = searchCityInput.value;
            }
        } else {
            return;
        }
    })

    // fetch data from the API

    function dataFetchCurrent(){
        fetch(`https://api.weatherapi.com/v1/current.json?key=fbb0702d04e54943826133310240308&q=${cityValueName}`)
            .then((response) => response.json)
            .then((data) => currentDataHandelr(data))
            .catch(() => errorMessage());
    }
    function dataFectchForecast(){
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=fbb0702d04e54943826133310240308&q=${city_button}&days=7&aqi=no&alerts=no`)
            .then((response) => response.json())
            .then((forecastData) => forecastDataHandelr(forecastData));
    }

    const refresh = document.getElementById('refresh');
    const city_buttons = document.querySelectorAll('.city-button');
    const input = document.getElementById('input');
    const input_button = document.getElementById('search');

    let city_button = 'Amman';

    city_buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            city_button = button.innerHTML;
            getData();
            forecastGetData();
        })
    })
    input_button.addEventListener('click', function() {
        if(input.value === ''){
            return;
        } else{
            city_button = input.value;
            getData();
            forecastGetData();
        }
    })
    input.addEventListener('keydown', function(button) {
        if(button.key === 'Enter'){
            console.log('Enter enter')
            if(input.vlaue === ''){
                return;
            } else{
                city_button = input.value;
                getData();
                forecastGetData();
            }
        } else{
            return;       
        }
    })

    function errorCity(){
        document.getElementById('error').innerHTML = `Can't find City!`;
    }
    getData();
    forecastGetData();
    refresh.addEventListener('click', function() {
        getData();
        forecastGetData();
    })

    function showData(data){
        document.getElementById('error').innerHTML = ``;
        document.getElementById('city').innerHTML = data.location.name;
        document.getElementById('country').innerHTML = data.location.country;
        document.getElementById('time').innerHTML = data.location.localtime;
        document.getElementById('weather').innerHTML = `Temp ${data.current.temp_c} C`;
        document.getElementById('status').innerHTML = data.current.condition.text;
        document.getElementById('wind-dir').innerHTML = data.current.wind_dir;
        document.getElementById('wind-speed').innerHTML = `${data.current.wind_kph} Km/H`;
        document.getElementById('hu').innerHTML = data.current.humidity;
        document.getElementById('uv').innerHTML = data.current.uv;
    }


    function forecastGetData(){
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=fbb0702d04e54943826133310240308&q=${city_button}&days=7&aqi=no&alerts=no`)
            .then((response) => response.json())
            .then((forecastData) => forecastShowData(forecastData))
    }
    function forecastShowData(data){
        for(let reNum = 1; reNum < 7; reNum++){
            document.getElementById(`forecast-status-${reNum}`).innerHTML = data.forecast.forecastday[reNum].hour[12].condition.text;
            document.getElementById(`forecast-weather-${reNum}`).innerHTML = `Temp ${data.forecast.forecastday[reNum].hour[12].temp_c} C`;
            document.getElementById(`forecast-wind-speed-${reNum}`).innerHTML = `Wind ${data.forecast.forecastday[reNum].hour[12].wind_kph} Km/h`;
            document.getElementById(`forecast-time-${reNum}`).innerHTML = data.forecast.forecastday[reNum].hour[12].time;  
        }
    }
   
})