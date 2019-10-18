$( document ).ready(function() {
  thermostat = new Thermostat();
  var weatherIcons = {
    "clear sky": "01d.png",
    "few clouds": "02d.png",
    "scattered clouds": "03d.png",
    "broken clouds": "04d.png",
    "overcast clouds": "04d.png",
    "shower rain": "09d.png",
    "rain": "10d.png",
    "moderate rain": "10d.png",
    "light intensity shower rain": "10d.png",
    "light rain": "10d.png",
    "thunderstorm": "11d.png",
    "snow": "13d.png",
    "fog": "50d.png",
    "mist": "50d.png"}
  displayWeather('London')

  usageColour = function() {
    if (thermostat.energyUsage() === "medium-usage") {
      return $("#text-temperature").removeClass("text-success").removeClass("text-danger").addClass("text-warning");
    }
    else if (thermostat.energyUsage() === "low-usage") {
      return $("#text-temperature").removeClass("text-warning").addClass("text-success");
    }
    else {
      return $("#text-temperature").removeClass("text-warning").addClass("text-danger");
    }
  };

  $( "#temperature" ).text(thermostat.temp);
  $("#power-saving-status").text("ON")
  $("#saving-mode-on-btn").addClass("bg-info");


  $( "#increase-btn" ).click(function( event ) {
     thermostat.increase();
     $( "#temperature" ).text(thermostat.temp);
     usageColour();
   });

  $( "#decrease-btn" ).click(function( event ) {
    thermostat.decrease();
    $( "#temperature" ).text(thermostat.temp);
    usageColour();
  });

  $( "#reset-btn" ).click(function( event ) {
    thermostat.resetTemp();
    $( "#temperature" ).text(thermostat.temp);
    usageColour();
  });

  $( "#saving-mode-on-btn" ).click(function( event ) {
    if (thermostat.savingMode === false) {
      thermostat.switchSavingMode();
      $( "#temperature" ).text(thermostat.temp);
      $("#power-saving-status").text("ON");
      $("#saving-mode-on-btn").addClass("bg-info");
      $("#saving-mode-off-btn").removeClass("bg-info");
      usageColour();
    }
  });

  $( "#saving-mode-off-btn" ).click(function( event ) {
    if (thermostat.savingMode === true) {
      thermostat.switchSavingMode();
      $( "#temperature" ).text(thermostat._max())
      $( "#temperature" ).text(thermostat.temp);
      $("#power-saving-status").text("OFF");
      $("#saving-mode-off-btn").addClass("bg-info");
      $("#saving-mode-on-btn").removeClass("bg-info");
      usageColour();
    }
  });

  $('#select-city').submit(function(event) {
    event.preventDefault();
    var city = $('#current-city').val();
    displayWeather(city);

  });

  function displayWeather(city) {
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city;
    var token = "&appid=5197ed8e832ba1cca4f7a3461daa9de9"
    var units = "&units=metric"
    $.get( url + token + units, function( data ) {
      var icon = weatherIcons[data.weather[0]['description']]
      var weather = (data.weather[0]['main'])
      $( "#city" ).text( city );
      $( "#current-temperature" ).text( data.main.temp );
      $( "#main-weather" ).text( weather );
      $("#icons").attr("src", "http://openweathermap.org/img/wn/" + icon)
    });
  };

  $( "#save-settings-btn" ).click(function( event ) {
    var data = {"temp": thermostat.temp, "savingMode": thermostat.savingMode, "city": $('#city').text() }
    $.post( "/", data, function(data) {
      alert("Settings saved")
    })
  });

});
