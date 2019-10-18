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
  loadSetting()

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

  $( "#saving-mode-btn" ).click(function( event ) {
    thermostat.switchSavingMode();
    if (thermostat.savingMode) {
      $( "#temperature" ).text(thermostat.temp);
      $("#power-saving-status").text("ON");
    } else {
      $( "#temperature" ).text(thermostat._max())
      $( "#temperature" ).text(thermostat.temp);
      $("#power-saving-status").text("OFF");
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

  function applySettings(data) {
    if (data.savingmode == 'false') {
      $("#power-saving-status").text("OFF");
      thermostat.switchSavingMode();
    } else {
      $("#power-saving-status").text("ON");
    }
    displayWeather(data.city)
    $( "#temperature" ).text(data.temp);
    thermostat.temp = parseInt(data.temp)
    usageColour();
  }

  function applyDefault() {
    displayWeather('London')
    $("#temperature").text(thermostat.temp);
    $("#power-saving-status").text("ON");
  }

  function loadSetting() {
    $.get( "/", function(data) {
      if (data) {
        applySettings(data);
      } else {
        applyDefault()
      }
    }, "json")
  }





});
