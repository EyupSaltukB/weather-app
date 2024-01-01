const container = document.querySelector('.container')
const search = document.querySelector('.search-box button')
const  weatherBox = document.querySelector('.weather-box')
const  weatherDetails = document.querySelector('.weather-details')
const  error = document.querySelector('.not-found')

search.addEventListener("click" , () => {
    const APIKey = "fa4cb45846f1e72cf5a76bd4d6ad1fc4";
    const city = document.querySelector('.search-box input').value;

    if(city == "")
    return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(json => {


        if(json.cod == "404"){
            container.style.height = "400px";
            weatherBox.classList.remove("active");
            weatherDetails.classList.remove("active");
            error.classList.add("active");
            return;
        }

        container.style.height = "555px";
            weatherBox.classList.add("active");
            weatherDetails.classList.add("active");
            error.classList.remove("active");

        const image = document.querySelector(".weather-box img");
        const temperature = document.querySelector(".weather-box .temperature");
        const description = document.querySelector(".weather-box .description");
        const humidity = document.querySelector(".weather-details .humidity span");
        const wind = document.querySelector(".weather-box .wind span");

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'images/clear.png';
                break;
            
            case 'Rain':
                image.src = 'images/rain.png'    
                break;

            case 'Snow':
                image.src = 'images/snow.png'    
                break;
            
            case 'Clouds':
                image.src = 'images/clouds.png'    
                break;   
                
            case 'Mist':
                image.src = 'images/mist.png'    
                break;

            case 'Clouds':
                image.src = 'images/clouds.png'    
                break;

            case 'Drizzle':
                image.src = 'images/drizzle.png'    
                break;
        
            default:
                image.src = 'images/cloud.png'
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`
        description.innerHTML = `${json.weather[0].description}`
        humidity.innerHTML = `${json.main.humidity}%`
        wind.innerHTML = `${parseInt(json.wind.speed)}km/h`
    })
})