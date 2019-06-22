//mapbox info

var latitude;
var longitude;



//var mymap = L.map('mapid').setView([51.505, -0.09], 13);

//L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery � <a href="https://www.mapbox.com/">Mapbox</a>',
//   maxZoom: 18,
//    id: 'mapbox.streets',
//    accessToken: 'your.mapbox.access.token'
//}).addTo(mymap);

//var marker = L.marker([51.5, -0.09]).addTo(mymap);

//var circle = L.circle([51.508, -0.11], {
//    color: 'red',
//    fillColor: '#f03',
//    fillOpacity: 0.5,
//    radius: 500
//}).addTo(mymap);


//wikipedia search



var searchTerm;
var searchRefined;
var searchRefined2;
var wikiResults;
var QRimg = $('<img>');
$('#qrstuff').append(QRimg);
var zipCode;
var weatherUrl;
var pollutionUrl;

console.log(wikiUrl);
var wikiUrl;

var weatherDay = $('#weatherDay');
var weatherNight = $('#weatherNight');
var temperature = $('#temperature');
var aqiMessage = $('#aqiMessage');
var pm = $('#pm');
var humidity = $('#humidity');
var pressure = $('#pressure');
var windSpeed = $('#windSpeed');
var windDir = $('#windDir');







// $(document).ready(function(){
$('#submit').on("click", function(){ 
searchTerm = $('#state');
searchRefined = searchTerm[0].value;

wikiUrl = "https://open.mapquestapi.com/geocoding/v1/address?key=KL6bvb80lfLEE1Ys5TjUKyu6Be7gdXLX&location="  + searchRefined;

wikiUrl2 = "https://en.wikipedia.org/w/api.php?action=opensearch&search="  + searchRefined2 + "&format=json&origin=*";




    $.ajax({
        type: "GET",
        url: wikiUrl,
        contentType: "application/json; charset=utf-8",
        async: true,
        dataType: "json",
      }).then(function(data) {
            console.log(data);
            console.log(data.results[0].locations[0].latLng.lat);
            console.log(data.results[0].locations[0].latLng.lng);
            console.log(data.results[0].locations[0].postalCode);
            latitude = data.results[0].locations[0].latLng.lat;
            longitude = data.results[0].locations[0].latLng.lng;
            // wikiResults = data[2][0];
            zipCode = data.results[0].locations[0].postalCode;
            console.log(zipCode);


            weatherUrl = "https://cors-anywhere.herokuapp.com/http://dataservice.accuweather.com/forecasts/v1/daily/1day/" + zipCode + "?apikey=Hh3qVnjiiZZFlhLgskjnE1kxf4orP7uN";

            // pollutionUrl = "http://api.airpollutionapi.com/1.0/aqi?lat=" + latitude + "&lon=" + longitude + "&APPID=qb5f8bub81ciq4e1rgrf5kcdo1";

                
                    
            var map = L.map('mapid', {
                //center: [43.64701, -79.39425], //comment out one of the centers
                center: [latitude, longitude],
                zoom: 15
            });
            L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            var popup = L.popup()
            .setLatLng([latitude, longitude])
            .setContent("You are here")
            .openOn(map);
  
        



        // }).then(function(){


        // });
    }).then(function(){$.ajax({
        method: "GET",
        url: "https://dataservice.accuweather.com/forecasts/v1/daily/1day/" + zipCode + "?apikey=Hh3qVnjiiZZFlhLgskjnE1kxf4orP7uN",
    }).then(function(data2) {
            console.log("weather: " + data2);
            console.log(data2);
            console.log(data2.DailyForecasts[0].Day.IconPhrase);
            console.log(data2.DailyForecasts[0].Day.HasPrecipitation);
            console.log(data2.DailyForecasts[0].Night.IconPhrase);
            console.log(data2.DailyForecasts[0].Night.HasPrecipitation);
            console.log(data2.DailyForecasts[0].Temperature.Maximum.Value);
            console.log(data2.DailyForecasts[0].Temperature.Minimum.Value);

            weatherDay.html("Today's Forecast: " + data2.DailyForecasts[0].Day.IconPhrase + "<br>Is it going to rain during the day? " + data2.DailyForecasts[0].Day.HasPrecipitation);
            weatherNight.html("Tonight: " + data2.DailyForecasts[0].Night.IconPhrase + "<br>Is it going to rain tonight? " + data2.DailyForecasts[0].Night.HasPrecipitation);
            temperature.html("Maximum Temp: " + data2.DailyForecasts[0].Temperature.Maximum.Value + "°F<br>Minimum Temp: " + data2.DailyForecasts[0].Temperature.Minimum.Value + "°F");





        })
    }).then(function(){$.ajax({
        method: "GET",
        url: "http://api.airpollutionapi.com/1.0/aqi?lat=" + latitude + "&lon=" + longitude + "&APPID=qb5f8bub81ciq4e1rgrf5kcdo1",
    }).then(function(data3) {
            console.log("weather: " + data3);
            console.log(data3);
            console.log(data3.data.alert);
            console.log(data3.data.aqiParams[0].value);
            console.log(data3.data.aqiParams[1].value);
            console.log(data3.data.aqiParams[2].value);
            console.log(data3.data.aqiParams[3].value);
            console.log(data3.data.aqiParams[4].value);

            aqiMessage.text(data3.data.alert);
            pm.text("Particulate matter: " + data3.data.aqiParams[0].value);
            humidity.text("Humidity: " + data3.data.aqiParams[1].value);
            pressure.text("Pressure: " + data3.data.aqiParams[2].value);
            windSpeed.text("Wind Speed: " + data3.data.aqiParams[3].value);
            windDir.text("Wind Direction: " + data3.data.aqiParams[4].value);

        })
    });


        







































	searchTerm = $('#state');
  console.log(wikiResults);
  var stuffToQr = wikiResults;
  var getUrl = "https://api.qrserver.com/v1/create-qr-code/?data=" + stuffToQr + "!&size=100x100";
  $('#results').text(wikiResults);
  QRimg.attr('src', getUrl);
});

//more stuff below

$("#message").html("<h1>Travel Information</h1>");




// QRimg.attr('src', getUrl);


//$('#submit').on("click", function() {

//var stateValue = state[0].value.trim();
//var breweryValue = brewery[0].value.trim();


//mapboxgl.accessToken = 'undefined';
//var map = new mapboxgl.Map({
//container: 'map',
//style: 'mapbox://styles/mapbox/streets-v9'
//});


//?by_state=NY
//&by_name=cooper
//&by_tag=patio
//&by_type=micro



// var patioOptions = ['dog-friendly', 'patio', 'food-service', 'food-truck', 'tours'];
// var typeOptions = ['micro','regional','brewpub','large','planning','bar','contract','proprietor'];

// for (var i = 0; i < patioOptions.length; i++) {
// 	var option1 = $('<option>');
// 	option1.attr('id', 'typeSelect1');
// 	option1.attr('value', 'val'+patioOptions[i].indexOf());
// 	option1.text(patioOptions[i]);
// 	$('#select1').append(option1);
// };

//for (var j = 0; j < typeOptions.length; j++) {
//        var option2 = $('<option>');
//        option2.attr('id', 'typesSelect2');
//        option2.attr('value', 'val'+typeOptions[j].indexOf());
//        option2.text(typeOptions[j]);
//        $('#select2').append(option2);
//};




//getUrl += '?' + $.param({
//	'X-RapidAPI-Host': 'brianswu-open-brewery-db-v1'
//});
//getUrl += '?' + $.param({
//	'X-RapidAPI-Key': '8c39383b6amsh3d2896d8d2ecd7cp1a2540jsn0b22b35cb22f'
//});


//if (stateValue != "") {
//        console.log(stateValue);
//        getUrl += "&by_state=" + stateValue;
//};

//if (breweryValue != "") {
//        console.log(breweryValue);
//        getUrl += "&by_name=" + breweryValue;
//};



//$.ajax({
//	url: getUrl,
//	type: "GET",
//	dataType: 'JSON',
//	success: function(data) {
//		console.log(data);
//	},
//	error: function() {
//		console.log("failure to retrieve API");
//	}
//});

//});
