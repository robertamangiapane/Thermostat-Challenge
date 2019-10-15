function Thermostat(temp = 20){
  this.temp = temp;
};

Thermostat.prototype.up = function() {
  this.temp += 1;
};


Thermostat.prototype.down = function() {
  this.temp -= 1;
};
