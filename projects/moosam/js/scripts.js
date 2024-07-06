document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.querySelector(".material-symbols-outlined");
    const searchBar = document.querySelector(".search-bar");
    const cityElement = document.querySelector(".city");
    const temperatureElement = document.querySelector(".temperature");
    const descriptionElement = document.querySelector(".description");
    const tempRangeElement = document.querySelector(".temp-range");
    const windElement = document.querySelector(".weather-details .detail-item:nth-child(1) div:nth-child(2)");
    const precipitationElement = document.querySelector(".weather-details .detail-item:nth-child(2) div:nth-child(2)");
    const thundershowerElement = document.querySelector(".weather-details .detail-item:nth-child(3) div:nth-child(2)");

    const colorPalettes = [
        { backgroundColor: "#F7D101", contentColor: "#000000" },
        { backgroundColor: "#12229D", contentColor: "#F4F6FC" },
        { backgroundColor: "#760504", contentColor: "#FBDC6A" },
        { backgroundColor: "#155E14", contentColor: "#D2FFAA" },
        { backgroundColor: "#D7DF23", contentColor: "#152039" },

        { backgroundColor: "#d7df23", contentColor: "#152039" },
        { backgroundColor: "#4c7031", contentColor: "#ffffff" },
        { backgroundColor: "#503530", contentColor: "#ede8ea" },
        { backgroundColor: "#001f3d", contentColor: "#f8dcbf" },

        { backgroundColor: "#e84e38", contentColor: "#d2ffaa" },
        { backgroundColor: "#2b4743", contentColor: "#ffd3db" },
        { backgroundColor: "#ffc61a", contentColor: "#372a28" },
        { backgroundColor: "#88ca5e", contentColor: "#155e14" },

        { backgroundColor: "#8c3839", contentColor: "#ffd3db" },
        { backgroundColor: "#810947", contentColor: "#FFFFFF" },
        { backgroundColor: "#763c00", contentColor: "#f9f7dc" },
        { backgroundColor: "#ffce6d", contentColor: "#291b25" },

        { backgroundColor: "#4C7031", contentColor: "#FFFFFF" },
        { backgroundColor: "#001F3D", contentColor: "#F8DCBF" },
        { backgroundColor: "#503530", contentColor: "#EDE8EA" },
        { backgroundColor: "#E84E38", contentColor: "#D2FFAA" },

        { backgroundColor: "#FFD3DB", contentColor: "#2B4743" },
        { backgroundColor: "#FFC61A", contentColor: "#372A28" },
        { backgroundColor: "#88CA5E", contentColor: "#155E14" },
        { backgroundColor: "#8C3839", contentColor: "#FFD3DB" },

        { backgroundColor: "#FFFFFF", contentColor: "#810947" },
        { backgroundColor: "#763C00", contentColor: "#F9F7DC" },
        { backgroundColor: "#FFCE6D", contentColor: "#291B25" },
        { backgroundColor: "#CAE8FF", contentColor: "#050A30" },

        { backgroundColor: "#2B192E", contentColor: "#F5E8DA" },
        { backgroundColor: "#7B3911", contentColor: "#EBA327" },
        { backgroundColor: "#E1F16B", contentColor: "#272727" },
        { backgroundColor: "#E3DDDC", contentColor: "#2F3B69" },

        { backgroundColor: "#795833", contentColor: "#F0DFC8" },
        { backgroundColor: "#AFC1D0", contentColor: "#0B1320" },
        { backgroundColor: "#EDFFCC", contentColor: "#81B622" },
        { backgroundColor: "#745E4D", contentColor: "#F8F7F4" }
    ];

    const applyRandomColorPalette = () => {
        const randomPalette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
        document.body.style.backgroundColor = randomPalette.backgroundColor;
        document.documentElement.style.setProperty("--content-color", randomPalette.contentColor);
    };

    const fetchWeatherData = (city) => {
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                const data = JSON.parse(this.responseText);
                updateWeatherData(data);
                fetchPast5HoursWeatherData(city); // Fetch past 5-hour weather data after updating the current weather data
                applyRandomColorPalette(); // Apply color palette after fetching data
            }
        });

        const query = `https://weatherapi-com.p.rapidapi.com/current.json?q=${encodeURIComponent(city)}`;
        xhr.open("GET", query);
        xhr.setRequestHeader("x-rapidapi-key", "fd4a51179fmsh87677cfe4263525p17d2fejsn16fd16e2b2ca");
        xhr.setRequestHeader("x-rapidapi-host", "weatherapi-com.p.rapidapi.com");

        xhr.send(null);
    };

    const fetchPast5HoursWeatherData = (city) => {
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                const data = JSON.parse(this.responseText);
                updatePast5HoursWeatherData(data);
            }
        });

        const query = `https://weatherapi-com.p.rapidapi.com/history.json?q=${encodeURIComponent(city)}&dt=${getYesterdayDate()}`;
        xhr.open("GET", query);
        xhr.setRequestHeader("x-rapidapi-key", "fd4a51179fmsh87677cfe4263525p17d2fejsn16fd16e2b2ca");
        xhr.setRequestHeader("x-rapidapi-host", "weatherapi-com.p.rapidapi.com");

        xhr.send(null);
    };

    const getYesterdayDate = () => {
        const date = new Date();
        date.setDate(date.getDate() - 1);
        return date.toISOString().split("T")[0];
    };

    const updateWeatherData = (data) => {
        // Update city name
        cityElement.textContent = data.location.name;

        // Update temperature
        const temperature = data.current.temp_c;
        temperatureElement.textContent = `${temperature}°`;

        // Update description
        descriptionElement.textContent = data.current.condition.text;

        // Update temperature range
        // Since the API doesn't provide past 24-hour range, this will be skipped
        tempRangeElement.textContent = `${temperature}°—${temperature}°`;

        // Update wind
        windElement.textContent = `${data.current.wind_kph} km/h`;

        // Update precipitation
        precipitationElement.textContent = `${data.current.precip_mm} mm/h`;

        // Update thundershower (example field)
        thundershowerElement.textContent = data.current.condition.text.includes("Thunder") ? "Yes" : "No";

        // Update hourly forecast - Since the API provides only current weather, this part can be adjusted accordingly or removed
        const hourlyForecastElement = document.querySelector(".hourly-forecast");
        hourlyForecastElement.innerHTML = `<h3>Current</h3>`;
        const hourlyItem = document.createElement("div");
        hourlyItem.className = "hourly-item";
        hourlyItem.innerHTML = `<span>Now</span><span>${data.current.condition.text}</span><span>${temperature}°</span>`;
        hourlyForecastElement.appendChild(hourlyItem);
    };

    const updatePast5HoursWeatherData = (data) => {
        const hourlyForecastElement = document.querySelector(".hourly-forecast");
        hourlyForecastElement.innerHTML = `<h3>Past 5 Hours</h3>`;

        const hours = data.forecast.forecastday[0].hour.slice(-5); // Get the last 5 hours
        hours.forEach((hour) => {
            const time = new Date(hour.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
            const hourlyItem = document.createElement("div");
            hourlyItem.className = "hourly-item";
            hourlyItem.innerHTML = `<span>${time}</span><span>${hour.condition.text}</span><span>${hour.temp_c}°</span>`;
            hourlyForecastElement.appendChild(hourlyItem);
        });
    };

    const handleSearch = () => {
        const city = searchBar.value;
        fetchWeatherData(city);
    };

    // Event listener for search button
    searchButton.addEventListener("click", handleSearch);

    // Event listener for Enter key in search bar
    searchBar.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    });

    // Initial fetch for default location
    fetchWeatherData("Bangalore");
});
