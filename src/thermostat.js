function Thermostat(temp = 20){
  this.temp = temp;
  this.min = 10
  this.savingMode = true
  this.max = 25
};

Thermostat.prototype.up = function() {
  if (this.temp >= this.max) { return null }
  this.temp += 1;
};


Thermostat.prototype.down = function() {
  if (this.temp <= this.min) { return null }
  this.temp -= 1;
};

Thermostat.prototype.isSavingMode = function() {
  return this.savingMode
};
