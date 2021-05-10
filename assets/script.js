var city = "Raleigh";
var apiKey = "b563522ef21f105beb9c536cd2f379b4";
var requestCityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
var cityInput = $("#city-input");
var temperature = $("#temp");
var humidity = $("#humidity");
var windSpeed = $("#wind-speed");
var uvIndex = $("#uv-index");

var iconCurrent = data.current.weather[0].icon
function dailyWeather() {
    var currentIconURL = 'http://openweathermap.org/img/wn/'+iconCurrent+'@2x.png'
    temperature.text(tempF.toFixed(2));
    windspeed.text(windSpeed);
    humidity.text(humidity);
    uvIndex.text(uvIndex);
    $('#date').text(city + '  '+date + ' ');

}

dailyWeather()