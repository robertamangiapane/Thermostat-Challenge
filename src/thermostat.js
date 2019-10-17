function Thermostat(){
  this.temp = 20;
  this.min = 10
  this.savingMode = true
  // this.tempMax = this._max
};

Thermostat.prototype.increase = function() {
  if (this.temp >= this._max()) { return null }
  this.temp += 1;
};


Thermostat.prototype.decrease = function() {
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

Thermostat.prototype.energyUsage = function() {
  if (this.temp < 18) {
    return "low-usage";
  } else if (this.temp < 25) {
    return 'medium-usage';
  } else {
    return 'high-usage';
  };
};

Thermostat.prototype.switchSavingMode = function() {
  this.savingMode = !this.savingMode
  if (this.temp > this._max()) {
    this.temp = this._max()
  }
};
