function Thermostat(temp = 20){
  this.temp = temp;
  this.min = 10
  this.savingMode = true
};

Thermostat.prototype.up = function() {
  if (this.temp >= this._max()) { return null }
  this.temp += 1;
};


Thermostat.prototype.down = function() {
  if (this.temp <= this.min) { return null }
  this.temp -= 1;
};

Thermostat.prototype.isSavingMode = function() {
  return this.savingMode
};

Thermostat.prototype._max = function () {
  if (this.savingMode === true) {
    return 25
  } else {
    return 32
  }
};

Thermostat.prototype.resetTemp = function() {
  this.temp = 20
}
