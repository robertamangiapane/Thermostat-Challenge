$( document ).ready(function() {
  thermostat = new Thermostat();
  displayWeather('London')

  usageColour = function() {
    if (thermostat.energyUsage() === "medium-usage") {
      return $(".card-header").removeClass("bg-success").removeClass("bg-danger").addClass("bg-warning");
    }
    else if (thermostat.energyUsage() === "low-usage") {
      return $(".card-header").removeClass("bg-warning").addClass("bg-success");
    }
    else {
      return $(".card-header").removeClass("bg-warning").addClass("bg-danger");
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
      $( "#city" ).text( 'Current temperature in ' + city );
      $( "#current-temperature" ).text( data.main.temp );
    });
  };

});
