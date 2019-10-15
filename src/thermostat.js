function Thermostat(temp = 20){
  this.temp = temp;
  this.min = 10
};

Thermostat.prototype.up = function() {
  this.temp += 1;
};


Thermostat.prototype.down = function() {
  if (this.temp <= 10) { return null }
  this.temp -= 1;
};
