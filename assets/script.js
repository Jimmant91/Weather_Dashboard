var currentDay = moment().format("MM-DD-YYYY");
var apiKey = "7d37a801a6949582b0986b049326bbd9";
var citiesArray = [];

function getLocalWeather(position) {

    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    var requestCityURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&APPID=${apiKey}`;


    $.ajax({
        url: requestCityURL,
        method: "GET"
    }).then(function (response) {
        //WEATHER ICON
        var icon = `https://openweathermap.org/img/w/${response.weather[0].icon}.png`

        //UV INDEX FUNCTION
        getUVIndex(lat, lon);

        //UPDATE MAIN WEATHER CARD (populates text/data from API)
        $('#city-name').text(`${response.name}, ${response.sys.country}`);
        $('#current-date').text(`(${currentDay})`);
        $('#weather-icon').attr('src', icon);
        $('#temp').text(`${response.main.temp.toFixed(1)} \xB0F`);
        $('#humid').text(`${response.main.humidity}%`)
        $('#wind').text(`${response.wind.speed.toFixed(2)} mi/s`)
    });

    requestCityURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`

    $.ajax({
        url: requestCityURL,
        method: "GET"
    }).then(function (response) {
        // sets array to start at 12 noon on following day
        var arrayIndex = 4;

        // FOR LOOP RUNS 5 TIMES FOR 5 DAY WEATHER DATA 
        for (i = 1; i < 6; i++) {
            var day = moment().add(i, 'days').format('MM-DD-YYYY');
            var iconURL = `https://openweathermap.org/img/w/${response.list[arrayIndex].weather[0].icon}.png`

            $(`#forecast-date-${i}`).text(day);
            $(`#forecast-temp-${i}`).text(`${response.list[arrayIndex].main.temp.toFixed(1)} \xB0F`);
            $(`#forecast-humid-${i}`).text(response.list[arrayIndex].main.humidity + '%');
            $(`#forecast-image-${i}`).attr('src', iconURL);

            // moves array index up 24 hours
            arrayIndex += 8;
        }
    })
};

//GETTING WEATHER 
function getCurrentWeather(city) {
    // DATA FROM API (CODE)
    let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // LOCAL TIME
        var unixTime = response.dt + response.timezone;
        var today = moment.unix(unixTime).format("MM-DD-YYYY");

        // GET LAT & LOT FOR UV INDEX 
        var lat = response.coord.lat
        var lon = response.coord.lon

        //GET WEATHER ICON
        var iconURL = `https://openweathermap.org/img/w/${response.weather[0].icon}.png`

        // call UV index function
        getUVIndex(lat, lon);
        $('#city-name').text(`${response.name}, ${response.sys.country}`);
        $('#current-date').text(`(${today})`);
        $('#weather-icon').attr('src', iconURL);
        $('#temp').text(`${response.main.temp.toFixed(1)} \xB0F`);
        $('#humid').text(`${response.main.humidity}%`)
        $('#wind').text(`${response.wind.speed.toFixed(2)} mi/s`)


        getFiveDay(city, unixTime);

        // stores input in local storage
        storeData(city);

    })
}