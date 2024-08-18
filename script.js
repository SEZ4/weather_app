document.addEventListener('DOMContentLoaded', function() {
    // You can steal the API key I don't mind (it's Free) :)
    const weatheAPIkey = 'fbb0702d04e54943826133310240308';
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
            dataFetchCurrent();
            dataFectchForecast();
        })
    })
    searchCityButton.addEventListener('click', function() {
        if(searchCityInput.vlaue === ''){
            return;
        } else {
            cityValueName = searchCityInput.value;
            dataFetchCurrent();
            dataFectchForecast();
        }
    })
    searchCityInput.addEventListener('keydown', function(button) {
        if(button.key === 'Enter'){
            if(searchCityInput.value === ''){
                return;
            } else {
                cityValueName = searchCityInput.value;
                dataFetchCurrent();
                dataFectchForecast();
            }
        } else {
            return;
        }
    })
    dataFetchCurrent();
    dataFectchForecast();

    // fetch data from the API

    function dataFetchCurrent(){
        fetch(`https://api.weatherapi.com/v1/current.json?key=${weatheAPIkey}&q=${cityValueName}&aqi=no&alerts=no`)
            .then((response) => response.json())
            .then((data) => currentDataOutput(data));
            //.catch(() => errorMessage());
    }
    function dataFectchForecast(){
        fetch(`http://api.weatherapi.com/v1/forecast.json?key=${weatheAPIkey}&q=${cityValueName}&days=7&aqi=no&alerts=no`)
            .then((response) => response.json())
            .then((data) => forecastDataHandelr(data));
    }

    //  Output data to HTML

    function currentDataOutput(data){
        cityName.innerHTML = data.location.name;
        countryName.innerHTML = data.location.country;
        cityTime.innerHTML = data.location.localtime;
        currentTemp.innerHTML = `${data.current.temp_c} C`;
        weatherStatus.innerHTML = data.current.condition.text;
        windDir.innerHTML = data.current.wind_dir;
        windSpeed.innerHTML = `${data.current.wind_kph} Km/H`;
        humidity.innerHTML = `Humidity: ${data.current.humidity}`;
        uvLight.innerHTML = `UV Light: ${data.current.uv}`;
    }

    function forecastDataHandelr(data){
        for(let i = 0; i < 3; i++){
            document.getElementById(`forecast-status-${i}`).innerHTML = data.forecast.forecastday[i].hour[12].condition.text;
            document.getElementById(`forecast-temp-${i}`).innerHTML = `${data.forecast.forecastday[i].hour[12].temp_c} C`;
            document.getElementById(`forecast-wind-speed-${i}`).innerHTML = `${data.forecast.forecastday[i].hour[12].wind_kph} Km/H`;
            document.getElementById(`forecast-date-${i}`).innerHTML = data.forecast.forecastday[i].hour[12].time;
        }
    }

})