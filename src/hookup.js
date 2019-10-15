window.onload = function(){
  var thermostat = new Thermostat;

  var temperature = $('#temp-text');
  var up = $('button.up-btn');
  var down = $('button.down-btn');
  var reset = $('button.reset-btn');
  var switchBtn = $('button.switch-btn');
  var cardClass = $('div.card');

  up.on('click', function(){
    upButton();
  });

  down.on('click', function(){
    downButton();
  });

  reset.on('click', function(){
    resetButton();
  });

  switchBtn.on('click', function(){
    switchButton();
  });


  setTemperature = function() {
    temperature.text(thermostat.temp);
  };

  upButton = function(){
    thermostat.up();
    setTemperature()
    setUsageColour();
  };

  downButton = function(){
    thermostat.down();
    setTemperature();
    setUsageColour();
  };

  resetButton = function() {
    thermostat.resetTemp();
    setTemperature();
    setUsageColour();
  }

  switchButton = function() {
    thermostat.switchSavingMode();
  }

  setUsageColour = function(){
    var usage = thermostat.energyUsage();
    if (usage === 'low-usage') {
      cardClass.removeClass('bg-danger')
      cardClass.removeClass('bg-warning')
      cardClass.addClass('bg-success')
    } else if (usage === 'medium-usage') {
      cardClass.removeClass('bg-danger')
      cardClass.removeClass('bg-success')
      cardClass.addClass('bg-warning')
    } else {
      cardClass.removeClass('bg-warning')
      cardClass.removeClass('bg-success')
      cardClass.addClass('bg-danger')
    };
  };



  setUsageColour();
  setTemperature();
};
