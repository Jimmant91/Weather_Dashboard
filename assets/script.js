var currentDay = moment().format(MM-DD-YYYY);
var apiKey = "b563522ef21f105beb9c536cd2f379b4";
var requestCityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
var citiesArray = [];
