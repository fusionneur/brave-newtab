"use strict";

(function () {

    let dom = document.getElementById("bgimg");
    dom.style.backgroundColor = 'WhiteSmoke';
    fetchImage();

    function fetchImage() {
        //console.log("screen.resolution: " + screen.width + 'x' + screen.height);
        fetch('https://source.unsplash.com/random/' + screen.width + 'x' + screen.height)
        .then(response => response)
        .then((imageObj) => {

            /*             var propValue;
            for (var propName in imageObj) {
            propValue = imageObj[propName]
            console.log(propName, ":", propValue);
            } */

            var image = new Image();
            var photoURL = imageObj.url;
            //console.log("photoURL: " + photoURL);
            image.onload = function () {
                dom.style.backgroundImage = `url(${photoURL})`;
            };
            image.src = photoURL;
        })
        .catch(() => {
            error();
        });
    }
    function error() {
        let dom = document.getElementById("bgimg");
        dom.style.backgroundColor = 'WhiteSmoke';
    }
})();

(function () {
    function checkTime(i) {
        return (i < 10) ? "0" + i : i;
    }

    function startTime() {
        var today = new Date(),
        h = checkTime(today.getHours()),
        m = checkTime(today.getMinutes()),
        s = checkTime(today.getSeconds());
        let time = h + ":" + m;
        document.getElementById('time').innerHTML = time;
        setTimeout(function () {
            startTime()
        }, 500);
    }
    startTime();
})();

class Init {

    constructor() {
        this.dateDetails = null;
        this.weatherDetails = null;
    }
}

class TabAction extends Init {
    constructor(props) {
        super(props);
    }
    setDateDetails() {
        this.dateDetails = getdateDetails();
    }
}

let tab = new TabAction;
tab.setDateDetails();
insertinDom();

function insertinDom() {
    document.getElementById('date').innerHTML = `${tab.dateDetails.day}, ${tab.dateDetails.month} ${tab.dateDetails.date}`;
    document.getElementById('weather').innerHTML = '<br>'; //create space for weather
}

function getdateDetails() {

    var today = new Date();
    var day = today.getDay();
    var dd = today.getDate();
    var mm = today.getMonth();
    var yyyy = today.getFullYear();
    var dL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return {
        day: dL[day],
        month: mL[mm],
        date: dd,
        year: yyyy
    }

}

//____________________________________________________________________________

/*
$.get("https://api.ipify.org?format=jsonp", function (response) {
console.log(response); //{ip: "<ip>"}
var ip = response.ip;
//console.log(ip); //<ip>
 */
//$.get('https://ipapi.co/' + ip + '/latlong/', function (response) {
$.get('https://ipapi.co/json', function (response) {
    //console.log(response);
    var city = response.city;
    //console.log(city);
    //var latlong = response.split(',');
    //console.log(latlong);
    //$.get('http://api.openweathermap.org/data/2.5/weather?lat=' + latlong[0] + '&lon=' + latlong[1] + '&appid=7e4dd03efbd4c382e324241cd5ab52ec' + '&units=metric', function (response) {
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=7e4dd03efbd4c382e324241cd5ab52ec' + '&units=metric', function (response) {
        //console.log(response);

        var feelTemp = Math.round(response.main.feels_like);
        //console.log("feelTemp: " + feelTemp);

        var weatherDescription = response.weather[0].description;
        //console.log(weatherDescription);

        var humidity = response.main.humidity;
        //console.log(humidity);

        //console.log(feelTemp + "°C, " + weatherDescription + "..");
        document.getElementById('weather').innerHTML = `${feelTemp}°C, ${weatherDescription}...`;

        //{"coord":{"lon":<lon>,"lat":<lat>},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03n"}],"base":"stations","main":{"temp":292.77,"feels_like":294.58,"temp_min":291.15,"temp_max":294.26,"pressure":1018,"humidity":82},"visibility":10000,"wind":{"speed":0.5,"deg":0},"clouds":{"all":29},"dt":1599531594,"sys":{"type":1,"id":6911,"country":"<country>","sunrise":1599536809,"sunset":1599583197},"timezone":10800,"id":676742,"name":"<name>","cod":200}
    })
})
/*
}, "jsonp");
 */

/*REF:
// $. is an alias for jQuery

//fetch image
https://javascript.info/fetch

//contentySecurityPolicy (manifest)
https://developer.chrome.com/extensions/contentSecurityPolicy
https://stackoverflow.com/questions/34950009/chrome-extension-refused-to-load-the-script-because-it-violates-the-following-c

//libraries
https://developers.google.com/speed/libraries
https://jquery.com/download/

//get IP
https://www.ipify.org/ //use https://api.ipify.org?format=jsonp
https://stackoverflow.com/questions/2067472/what-is-jsonp-and-why-was-it-created

//location by ip
https://ipapi.co/<ip>/latlong/
https://ipinfo.io/ //not used (requires api key), but gives ip, city, country

//weather by lat/lon
https://api.openweathermap.org/data/2.5/weather?lat=44&lon=26&appid=<apiId>
https://home.openweathermap.org/api_keys
//
 */

//____________________________________________________________________________


//Quote of the day
// Code for localStorage
const now = new Date();
//console.log("time now: " + now.getTime());
if (typeof(Storage) !== "undefined") {
    var quoteExpiry = localStorage.getItem("expiry");
    //console.log("previous quote expiry time: " + quoteExpiry);
    //console.log("Web Storage support - OK");
    if (now.getTime() < quoteExpiry) {
        // Retrieve value from local storage and assign to variable
        //localStorage.setItem("quote", "to be or not to be to be or not to be to be or not to be to be or not to be to be or not to be to be or not to be to be or not to be to be or not to be to be or not to be to be or not to be "); //simulate local storage (comment in prod)
        //console.log("Using quote from cached variable in local storage");
        var quote = localStorage.getItem("quote");
        document.getElementById('quote').innerHTML = `${quote}`;
    } else { //local storage expired, get updated quote
        const categories = ["inspire", "management", "life", "funny", "love", "art", "students"];
        const random = Math.floor(Math.random() * categories.length);
		const randomCategory = categories[random];
        //console.log(randomCategory);
        $.get('https://quotes.rest/qod?category='+randomCategory, function (response) {
            //console.log(response);
            //console.log("previous quote expired. Requesting new one");
            var quote = response.contents.quotes[0].quote;
            // Store value
            localStorage.setItem("quote", quote);
            const ttl = 60 * 60 * 1000; // 1hour time to live (in milliseconds)
			//quotes.rest allows 10 calls per hour in free plan
            var expiry = now.getTime() + ttl;
            //console.log(expiry);
            localStorage.setItem("expiry", expiry);
            document.getElementById('quote').innerHTML = `${quote}`;
        })
    }
} else {
    console.error("No Web Storage support");
}
