var city = "Raleigh";
var apiKey = "b563522ef21f105beb9c536cd2f379b4";
var requestCityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
var cityInput = $("#city-input");
var temperature = $("#temp");
var humidity = $("#humidity");
var windSpeed = $("#wind-speed");
var uvIndex = $("#uv-index");
var iconElement = $(".icon");

// currentCity.innerHTML =

// temperature.innerHTML =

// humidity.innerHTML =

// windSpeed.innerHTML =

// uvIndex.innerHTML =

// iconElement.innerHTML =

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

            

            var cityText = $("#current-city").innerHTML;
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