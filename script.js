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
    let time12;
    let windDirName;

    // excuting the fetch function

    cityButtonsName.forEach(function(button) {
        button.addEventListener('click', function() {
            cityValueName = button.children[1].innerHTML;
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
    refreshButton.addEventListener('click', function(){
        dataFetchCurrent();
        dataFectchForecast();
    })
    dataFetchCurrent();
    dataFectchForecast();

    // fetch data from the API

    function dataFetchCurrent(){
        fetch(`https://api.weatherapi.com/v1/current.json?key=${weatheAPIkey}&q=${cityValueName}&aqi=no&alerts=no`)
            .then((response) => response.json())
            .then((data) => currentDataOutput(data))
            .catch(() => errorMessage());
    }
    function dataFectchForecast(){
        fetch(`http://api.weatherapi.com/v1/forecast.json?key=${weatheAPIkey}&q=${cityValueName}&days=7&aqi=no&alerts=no`)
            .then((response) => response.json())
            .then((data) => forecastDataHandelr(data));
    }

    //  Output data to HTML

    function currentDataOutput(data){
        ErrorText.innerHTML = ''

        cityName.innerHTML = data.location.name;
        countryName.innerHTML = data.location.country;

        let [date, time] = data.location.localtime.split(' ');
        convertTime(time);
        cityTime.innerHTML = time12;
        date = date.replace(/-/g, '/');
        date = date.replace(/\b0/g, '');
        cityDate.innerHTML = date;

        let condition = data.current.condition.text;
        currentTemp.innerHTML = `${data.current.temp_c} C`;
        weatherStatus.innerHTML = condition;

        let windDataDir = data.current.wind_dir;
        windDiraction(windDataDir);
        windDir.innerHTML = windDirName;
        windSpeed.innerHTML = `${data.current.wind_kph} Km/H`;

        humidity.innerHTML = `Humidity: ${data.current.humidity}`;
        uvLight.innerHTML = `UV Light: ${data.current.uv}`;
        // Images
        dayNightIdentifier(time);
        statusImgHandler(condition);
        
    }

    function forecastDataHandelr(data){
        for(let i = 0; i < 3; i++){
            document.getElementById(`forecast-status-${i}`).innerHTML = data.forecast.forecastday[i].hour[12].condition.text;
            document.getElementById(`forecast-temp-${i}`).innerHTML = `${data.forecast.forecastday[i].hour[12].temp_c} C`;
            document.getElementById(`forecast-wind-speed-${i}`).innerHTML = `${data.forecast.forecastday[i].hour[12].wind_kph} Km/H`;
            document.getElementById(`forecast-date-${i}`).innerHTML = data.forecast.forecastday[i].hour[12].time;
        }
    }

    function errorMessage(){
        ErrorText.innerHTML = 'City Not Found!'
    }

    // Logical Operations

    function dayNightIdentifier(time){
        let numTime = time.slice(0, 2);
        numTime = parseInt(numTime, 10);
        if (numTime >= 20){
            cityDayStatus.setAttribute('src', 'imges/day/night.png')
        } else if (numTime < 6){
            cityDayStatus.setAttribute('src', 'imges/day/night.png')
        } else if (numTime >= 6){
            cityDayStatus.setAttribute('src', 'imges/day/day.png')
        }
    }
    function convertTime(time){
        let [hour, minutes] = time.split(':')
        hour = parseInt(hour);
        let period = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;
        time12 = `${hour}:${minutes} ${period}`;
    }
    function windDiraction(dir){
        const windDirections = {
            'N': { name: 'North', rotate: '0deg' },
            'NNE': { name: 'North North East', rotate: '22deg' },
            'NE': { name: 'North East', rotate: '45deg' },
            'ENE': { name: 'East North East', rotate: '67deg' },
            'E': { name: 'East', rotate: '90deg' },
            'ESE': { name: 'East South East', rotate: '112deg' },
            'SE': { name: 'South East', rotate: '135deg' },
            'SSE': { name: 'South South East', rotate: '157deg' },
            'S': { name: 'South', rotate: '180deg' },
            'SSW': { name: 'South South West', rotate: '202deg' },
            'SW': { name: 'South West', rotate: '225deg' },
            'WSW': { name: 'West South West', rotate: '247deg' },
            'W': { name: 'West', rotate: '270deg' },
            'WNW': { name: 'West North West', rotate: '292deg' },
            'NW': { name: 'North West', rotate: '315deg' },
            'NNW': { name: 'North North West', rotate: '337deg' }
        };

        let info = windDirections[dir];
        if (info) {
            windDirName = info.name;
            windDirImg.style.rotate = info.rotate;
        } else{
            console.log('Error With Wind Directions')
        }
    }
    function statusImgHandler(condition){
        const conditions = {
            'Clear': { path: 'imges/status/clear.png', alt: 'Clear Wehter Icon'},
            'Sunny': { path: 'imges/status/sunny.png', alt: 'Sunny Icon'},
            'Overcast': { path: 'imges/status/overcast.png', alt: 'Overcast icon'},
            'Patchy rain nearby' : { path: 'imges/status/Patchy rain nearby.png', alt: 'Patchy rain nearby icon'},
            'Light rain': { path: 'imges/status/light-rain.png', alt: 'Light Rain icon'},
            'Light rain shower': { path: 'imges/status/light rain shower.png', alt: 'light rain shower icon'},
            'Cloudy': { path: 'imges/status/cloudy.png', alt: 'Cloudy Icon'},
            'Partly cloudy': {path: 'imges/status/partly-cloudy.png', alt: 'partly Cloudy Icon'},
            'Partly Cloudy': {path: 'imges/status/partly-cloudy.png', alt: 'partly Cloudy Icon'},
            'Mist': { path: 'imges/status/mist.png', alt: 'Mist icon'},
            'Fog': { path: 'imges/status/fog.png', alt: 'Fog icon'}
        };

        let info = conditions[condition];
        if (info){
            weatherStatusImg.setAttribute('src', info.path);
            weatherStatusImg.setAttribute('alt', info.alt);
            //document.getElementById('site-icon').setAttribute('href', info.path);
        } else {
            weatherStatusImg.setAttribute('src', conditions.Clear.path);
            weatherStatusImg.setAttribute('alt', 'Status Icon Not Found!');
            //document.getElementById('site-icon').setAttribute('href', conditions.Cloudy.path);
        }
    }
    function CityButtonsImgID(){
        let cityName;
        let TimeData;
        for(let i = 0; i < cityButtonsName.length; i++){
            cityName = cityButtonsName[i].children[1].innerHTML;
            fetch(`https://api.weatherapi.com/v1/current.json?key=${weatheAPIkey}&q=${cityName}&aqi=no&alerts=no`)
            .then((response) => response.json())
            .then((data) => TimeData = data)

            console.log(TimeData);
        }
    }
    CityButtonsImgID()
})














