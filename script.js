document.addEventListener('DOMContentLoaded', function() {
    
    const refresh = document.getElementById('refresh');
    const city_buttons = document.querySelectorAll('.city-button');
    const input = document.getElementById('input');
    const input_button = document.getElementById('search');
    const add_button = document.getElementById('plus-button');
    const add_input = document.getElementById('add-input');

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

    function getData(){
        fetch(`https://api.weatherapi.com/v1/current.json?key=fbb0702d04e54943826133310240308&q=${city_button}`)
            .then((response) => response.json())
            .then((data) => showData(data))
            .catch(() => errorCity());
    }
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

    add_button.addEventListener('click', function(){
        add_input.classList.toggle('add-input-toggle');
        add_input.classList.toggle('add-input');
    })
    add_input.addEventListener('keydown', function(button) {
        if(button.key === 'Enter'){
            console.log('button bdjxf')
            const new_button = document.createElement('button');
            new_button.classList.add('city-button');
            const currentDiv = document.querySelector('.citys');
            new_button.innerHTML = add_input.value;
            document.body.insertBefore(new_button, currentDiv);
        } else{
            return;
        }
    })


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