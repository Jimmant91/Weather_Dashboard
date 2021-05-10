var city = "Raleigh";
var apiKey = "b563522ef21f105beb9c536cd2f379b4";
var requestCityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
var cityInput = $("#city-input");
var temperature = $("#temp");
var humidity = $("#humidity");
var windSpeed = $("#wind-speed");
var uvIndex = $("#uv-index");
var iconElement = $(".icon");

var handleFormSubmit = function (event) {
    event.preventDefault();

    city = cityInput.val().toLowerCase();

    $("input[type='text'], textarea").val("");

    getApi();
}

function getApi() {

   fetch(requestCityUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            
            var weatherIconData = data.weather[0].icon;

            var weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIconData}@2x.png`;

            var weatherIcon = document.createElement("img");
            weatherIcon.setAttribute("src", weatherIconUrl);

            var cityDate = moment.unix(data.dt).format("M/d/yyy");

            

            var cityText = $("#current-city")
            cityText.text(data.name + ' ' + `(${cityDate}) `);
            cityText.append(weatherIcon);

            
            temperature.text(data.main.temp + " °F");

            
            humidity.text(data.main.humidity + " %");

            
            windSpeed.text(data.wind.speed + " MPH");

            var lat = data.coord.lat;
            var lon = data.coord.lon;

            var uvIndex = $("#uv-index");

            var uvIndexUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;
            fetch (uvIndexUrl)
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    //console.log(data);
                    uvIndex.text(data.value);

                    if (data.value <= 2.5) {
                        uvIndex.attr("class", "uv-block uv-low");
                    } else if (data.value <= 5.5) {
                        uvIndex.attr("class", "uv-block uv-moderate");
                    } else if (data.value <= 7.5) {
                        uvIndex.attr("class", "uv-block uv-high");
                    } else {
                        uvIndex.attr("class", "uv-block uv-very-high");
                    }
                })

            

        // storageArray.push(data.name);

        // checkForDuplicates();

        // localStorage.setItem("cities", JSON.stringify(storageNoDups));
    
        // renderSearchHistory();

        // renderFutureForecast();
            
        })
}

function renderFutureForecast() {

    var cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    fetch(cityUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        //console.log(data);
        var lat = data.coord.lat;
        var lon = data.coord.lon;

        var futureForecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=current,hourly,minutely&appid=${apiKey}`;
            
        fetch (futureForecastUrl)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                //console.log(data);
                var weatherCardContainer = $("#weather-cards");
                weatherCardContainer.empty();
                //console.log(data.daily.length);
                for (var i=0; i<5; i++) {
                    var weatherCard = document.createElement("div");
                    weatherCard.setAttribute("class", "col-12 col-xl border border-dark mx-2 forecast-bg text-white");
                    weatherCardContainer.append(weatherCard);

                    var weatherCardDate = document.createElement("div");
                    weatherCardDate.setAttribute("class", "has-text-white has-text-centered is-size-4")
                    weatherCardDate.textContent = moment.unix(data.daily[i].dt).format("M/D/yyyy");
                    weatherCard.append(weatherCardDate);

                    var weatherIconContainer = document.createElement("div");
                    weatherIconContainer.setAttribute("class", "is-flex is-justify-content-center");
                    weatherCard.append(weatherIconContainer);

                    var weatherCardIcon = document.createElement("img");
                    var weatherIconCode = data.daily[i].weather[0].icon;
                    weatherCardIcon.setAttribute("class", "weather-icon");
                    weatherCardIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`);
                    weatherIconContainer.append(weatherCardIcon);

                    var weatherCardTemp = document.createElement("div");
                    weatherCardTemp.setAttribute("class", "has-text-white has-text-centered");
                    weatherCardTemp.textContent = "Temp: " + data.daily[i].temp.day + " °F";
                    weatherCard.append(weatherCardTemp);

                    var weatherCardHumidity = document.createElement("div");
                    weatherCardHumidity.setAttribute("class", "has-text-white has-text-centered");
                    weatherCardHumidity.textContent = "Humidity: " + data.daily[i].humidity + " %";
                    weatherCard.append(weatherCardHumidity);
                    
                }
            }) 
    })
}