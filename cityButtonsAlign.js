document.addEventListener('DOMContentLoaded', function() {

    const highLight = document.getElementById('background-highlight');
    const buttonsWraper = document.querySelector('.cityButton');
    const buttons = document.querySelectorAll('.city-button-name');
    const citySearch = document.getElementById('search-city-input');
    const searchButton = document.getElementById('search-city-button');
    
    

    function highLightAlign(buttonSize, wraperSize){
        highLight.style.width = `${buttonSize.width}px`;
        highLight.style.height = `${buttonSize.height}px`;
        highLight.style.left = `${buttonSize.left - wraperSize.left}px`;
        highLight.style.top = `${buttonSize.top - wraperSize.top}px`;
    }

    buttons.forEach(function(button) {
        button.addEventListener('click', function(){
            let buttonsize = button.getBoundingClientRect();
            let wraperSize = buttonsWraper.getBoundingClientRect();
            highLightAlign(buttonsize, wraperSize);
        })
    })
    function firstButtonAlign(){
        let buttonsize = buttons[0].getBoundingClientRect();
        let wraperSize = buttonsWraper.getBoundingClientRect();
        highLightAlign(buttonsize, wraperSize)
    }
    
    firstButtonAlign();

    citySearch.addEventListener('keydown', function(button) {
        if(button.key === 'Enter'){
            if(citySearch.value === ''){
                return;
            } else {
                highLight.style.width = '0px';
                highLight.style.height = '0px';
            }
        } else {
            return;
        }
    })
    searchButton.addEventListener('click', function() {
        if(citySearch.value === ''){
            return;
        } else {
            highLight.style.width = '0px';
            highLight.style.height = '0px';
        }
    })

})