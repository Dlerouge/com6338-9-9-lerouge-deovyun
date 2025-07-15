document.addEventListener('DOMContentLoaded', () => {
    const weatherApp = document.getElementById('weather-app');
    const weatherSection = document.getElementById('weather');
    const searchForm = weatherApp.querySelector('form');
    const searchInput = document.getElementById('weather-search'); 

    const API_KEY = 'b7baad7ec72fd88277edf7b050c62330'; 

    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const userQuery = searchInput.value.trim();

        weatherSection.innerHTML = ''; 
        searchInput.value = '';

        if (!userQuery) {
            return;
        }

        const weatherURL = "https://api.openweathermap.org/data/2.5/weather";
        const fetchURL = `${weatherURL}?units=imperial&appid=${API_KEY}&q=${userQuery}`;

        try {
            const response = await fetch(fetchURL);
            const data = await response.json();

            if (response.ok) {
                displayWeatherData(data);
            } else {
                displayLocationNotFound();
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
            displayLocationNotFound(); 
        }
    });

    const displayWeatherData = (data) => {

        const { name, sys, weather, main, dt, coord } = data; 

        const cityCountry = `${name}, ${sys.country}`;
        const h2 = document.createElement('h2');
        h2.textContent = cityCountry;
        weatherSection.appendChild(h2);

        const mapLink = document.createElement('a');
        mapLink.href = mapLink.href = `https://www.google.com/maps/search/?api=1&query=${coord.lat},${coord.lon}`; 
        mapLink.target = '_blank';
        mapLink.textContent = 'Click to view map';
        weatherSection.appendChild(mapLink);

        const weatherIcon = document.createElement('img');

        weatherIcon.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
        weatherIcon.alt = weather[0].description;
        weatherSection.appendChild(weatherIcon);

        const descriptionPara = document.createElement('p');
        descriptionPara.style.textTransform = 'capitalize';
        descriptionPara.textContent = weather[0].description;
        weatherSection.appendChild(descriptionPara);
        weatherSection.appendChild(document.createElement('br')); 

        const currentTempPara = document.createElement('p');
        currentTempPara.textContent = `Current: ${main.temp.toFixed(2)}° F`;
        weatherSection.appendChild(currentTempPara);

        const feelsLikeTempPara = document.createElement('p');
        feelsLikeTempPara.textContent = `Feels like: ${main.feels_like.toFixed(2)}° F`;
        weatherSection.appendChild(feelsLikeTempPara);
        weatherSection.appendChild(document.createElement('br')); 

        const lastUpdatedPara = document.createElement('p');
        const date = new Date(dt * 1000); 
       const timeString = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit'
        });
 
        lastUpdatedPara.textContent = `Last updated: ${timeString}`;
        weatherSection.appendChild(lastUpdatedPara);
    };

    const displayLocationNotFound = () => {
        const h2 = document.createElement('h2');
        h2.textContent = 'Location not found';
        weatherSection.appendChild(h2);
    };
});