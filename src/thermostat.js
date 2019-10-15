function Thermostat(temp = 20){
  this.temp = temp;
};

Thermostat.prototype.up = function() {
  this.temp += 1;
};
