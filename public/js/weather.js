$.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAOUiSYFZUxtHi6zk3cqIYl7TOyPusI6fE", {}, function (data) {
    console.log(data)
    let lat, lng;
    lat = parseFloat(JSON.stringify(data.location.lat));
    lng = parseFloat(JSON.stringify(data.location.lng));
    $("p.location").replaceWith('');
    getWeather(lat, lng);
    $.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=AIzaSyAOUiSYFZUxtHi6zk3cqIYl7TOyPusI6fE", function (data) {
        var locationHTML = '<span style="font-size:3.5vw;">' + data.results[0].address_components[3].long_name + ", " + data.results[0].address_components[5].long_name + '</span><br/>';
        $("span.location2").replaceWith(locationHTML);
        // var results = data.results;
    });
});
function roundTemp(data) {
console.log(data);
    return data.toFixed(0);
}



function getTimeArray() {
    return ['12pm', '1', '2', '3', '4', '5', '6am', '7', '8', '9', '10', '11', '12pm', '1', '2', '3', '4', '5', '6pm', '7', '8', '9', '10', '11pm'];
}

function loadChart(currentHourlyData, oldHourlyData) {
    var chart = document.getElementById("c").getContext("2d");
    const timeLabel = getTimeArray();
    let data = {
        labels: timeLabel
        , datasets: [{
            label: "Yesterday"
            , fillColor: "rgba(220,220,220,0.2)"
            , strokeColor: "rgba(220,220,220,1)"
            , pointColor: "rgba(220,220,220,1)"
            , pointStrokeColor: "#fff"
            , pointHighlightFill: "#fff"
            , pointHighlightStroke: "rgba(220,220,220,1)"
            , data: oldHourlyData
        }, {
            label: "Today"
            , fillColor: "rgba(255,168,0,0.2)"
            , strokeColor: "rgba(255,168,0,1)"
            , pointColor: "rgba(255,168,0,1)"
            , pointStrokeColor: "#fff"
            , pointHighlightFill: "#fff"
            , pointHighlightStroke: "rgba(255,168,0,1)"
            , data: currentHourlyData
        }]
    };
    var option = {
        responsive: true
        , showXLabels: 10
        , scales: {
            xAxes: [{
                ticks: {
                    autoSkip: false
                }
            }]
        }
    };
    var MyNewChart = new Chart(chart).Line(data, option);
}

function parseHourlyData(data) {
    var hourlyDataToCel = [];
    // Extract hourly tempurature and stored in an array
    for (var i = 0; i < data.length; i++) {
        var time = data[i].time;
        var date = new Date(time * 1000);
        var temp = parseFloat(data[i].apparentTemperature)
        hourlyDataToCel[i] = temp;
    };
    //    console.log(hourlyDataToCel);
    return hourlyDataToCel;
}

function getWeather(lat, lng) {
    var currentHourlyData = [];
    var oldHourlyData = [];
    console.log(lat);
    console.log(lng);
    $.post('/yesterday', {
        lat: lat
        , lng: lng
    }, function (data) {
        console.log(data+"=============");
        oldHourlyData = data.hourly.data;
        //Delete the warning message.
        $("p.inner2").replaceWith('');
    });
    $.post('/today', {
        lat: lat
        , lng: lng
    }, function (data) { 
        console.log(data+"=+++++++++");
        
        currentHourlyData = data.hourly.data;
        console.log(currentHourlyData);
        loadChart(currentHourlyData, oldHourlyData);
        
        // Calculate averages
//        var currentAverage = calculateAverage(currentHourlyDataToCel);
//        var oldAverage = calculateAverage(oldHourlyDataToCel);
        
        //Print avg
//        console.log(currentAverage + ' is current ' + oldAverage + ' is old average.');
        
        // Calculate std
//        var currentStandartDiviation = calculateStandardDiviation(currentHourlyDataToCel, currentAverage);
//        var oldStandartDiviation = calculateStandardDiviation(oldHourlyDataToCel, oldAverage);
        
        //Print std
//        console.log(currentStandartDiviation + ' is current ' + oldStandartDiviation + ' is old std.');
        // Calculate extremas
        var currentHighAndLow = getExtremas(currentHourlyData);
        var oldHighAndLow = getExtremas(oldHourlyData);
        
        //Print extremas
//        console.log(currentHighAndLow[0] + ' is current high ' + currentHighAndLow[1] + 'is current low ' + oldHighAndLow[0] + ' is old high ' + oldHighAndLow[1] + ' is old low.');
       
        //Delete the warning message, replace with currentn wather information.
        $("p.inner").replaceWith('<h2 style="float: right;  font-size: 3.5vw;">' + roundTemp(data.currently.temperature) + ' Cº' + '<br style="clear:both" />' + '<p style="float: right;  font-size: 2vw;">' + 'H: ' + currentHighAndLow[0] + ' Cº ' + 'L: ' + currentHighAndLow[1] + ' Cº</p>' + '<br/>');
        $("span.sum").replaceWith('<span style="font-weight: normal; font-size: 3.5vw;">' + roundTemp(currentHourlyData.currently.summary) + '</span>');
    });
}

//function calculateAverage(data) {
//    var sum = 0;
//    for (var i = 0; i < data.length; i++) {
//        sum += parseInt(data[i]);
//        console.log(data[i]);
//    }
//    return sum / 24;
//}

//function calculateStandardDiviation(data, average) {
//    var differenceArray = new Array(24);
//    var std = 0;
//    for (var i = 0; i < data.length; i++) {
//        differenceArray[i] = data[i] - average;
//    }
//    console.log(differenceArray);
//    for (var i = 0; i < data.length; i++) {
//        std += Math.pow(differenceArray[0], 2);
//    }
//    std = Math.sqrt(std);
//    return std;
//}

function getExtremas(data) {
    data.sort(function (a, b) {
        return b - a
    });
    return [data[0], data[23]];
}
//$('#_12hour').on('click',function(){
//    console.log('12hour');
//});
//
//$('#_18hour').on('click',function(){
//    console.log('18hour');
//});
//
//$('#_24hour').on('click',function(){
//    console.log('24hour');
//});

