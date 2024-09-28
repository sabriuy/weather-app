const cityInput = document.querySelector(".city-input");
const searchBtn = document.querySelector(".search-btn");

const apiKey = '21b1d32a28b7a65a7caafb18928b4233';

const searchCitySection = document.querySelector(".search-city");
const weatherInfoSection = document.querySelector(".weather-info");

const countryTxt = document.querySelector(".country-txt");
const tempTxt = document.querySelector(".temp-txt");
const conditionTxt = document.querySelector(".condition-txt");
const humidityValueTxt = document.querySelector(".humidity-value-txt");
const windValueTxt = document.querySelector(".wind-value-txt");
const weatherImg = document.querySelector(".weather-img");
const currentDate = document.querySelector(".current-date-txt");

searchBtn.addEventListener('click', () => {
    if (cityInput.value.trim() !== '') {
        updateWeatherInfo(cityInput.value);
        cityInput.value = '';
        cityInput.blur();
    }
});

cityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && cityInput.value.trim() !== '') {
        updateWeatherInfo(cityInput.value);
        cityInput.value = '';
        cityInput.blur();
    }
});

async function getFetchData(city) {
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;
    const response = await fetch(url);
    
    
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
}

async function updateWeatherInfo(city) {
    try {
        const weatherData = await getFetchData(city);
        console.log(weatherData); 

        if (weatherData && weatherData.location) {
            const { country, name } = weatherData.location;
            const { temperature, weather_descriptions, humidity, wind_speed } = weatherData.current;

            
            countryTxt.textContent = name;
            tempTxt.textContent = `${temperature} °C`;
            conditionTxt.textContent = weather_descriptions[0];
            humidityValueTxt.textContent = `${humidity}%`;
            windValueTxt.textContent = `${wind_speed} km/h`;
            weatherImg.src = weatherData.current.weather_icons[0];
            
         

            
            const date = new Date();
            currentDate.textContent = date.toLocaleDateString();

            showDisplaySection(weatherInfoSection);
        } else {
            alert("City not found. Please try again.");
        }
    } catch (error) {
        alert("An error occurred: " + error.message);
    }
}

function showDisplaySection(section) {
    [searchCitySection, weatherInfoSection]
        .forEach(sec => sec.style.display = "none");
    section.style.display = 'flex';
}
