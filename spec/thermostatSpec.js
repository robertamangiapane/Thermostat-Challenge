describe("Thermostat", function(){

  beforeEach(function(){
    thermostat = new Thermostat();
  });

  it("knows temperature degrees", function(){
    expect(thermostat.temp).toEqual(20);
  });

  describe("increase", function() {

    it('increments the temp', function() {
      thermostat.increase();
      expect(thermostat.temp).toEqual(21)
    });

    it('doesnt go above the maximum temperature when powerSaving is true', function() {
      for(i = 0; i < 100; i++) {
        thermostat.increase();
      }
      expect(thermostat.temp).toEqual(25);
    });

    it('doesnt go above the maximum temperature when powerSaving is false', function() {
      thermostat.savingMode = false
      for(i = 0; i < 100; i++) {
        thermostat.increase();
      }
      expect(thermostat.temp).toEqual(32);
    });

  });

  describe("decrease", function() {

    it('descrease the temp', function() {
      thermostat.decrease();
      expect(thermostat.temp).toEqual(19)
    });

    it('doesnt go below the minimum temperature', function() {
      for(i = 0; i < 100; i++) {
        thermostat.decrease();
      }
      expect(thermostat.temp).toEqual(thermostat.min);
    });

  });

  describe("isSavingMode", function(){
    it('checks the savingMode', function(){
      expect(thermostat.isSavingMode()).toEqual(true)
    });
  });

  describe("resetTemp", function(){
    it('reset the temp to 20', function(){
      thermostat.resetTemp()
      expect(thermostat.temp).toEqual(20)
    });
  });

  describe('energyUsage', function(){

    it('returns the current usage as medium', function(){
      expect(thermostat.energyUsage()).toEqual("medium-usage");
    });

    it('returns the current usage as low', function(){
      for(i = 0; i < 5; i++) {
        thermostat.decrease()
      }
      expect(thermostat.energyUsage()).toEqual("low-usage");
    });

    it('returns the current usage as high', function(){
      for(i = 0; i < 6; i++) {
        thermostat.increase()
      }
      expect(thermostat.energyUsage()).toEqual("high-usage");
    });

  });

  describe('switchSavingMode', function(){

    it('switch the saving mode', function(){
      thermostat.switchSavingMode()
      expect(thermostat.savingMode).toEqual(false)
    });

    // it('put back the maximum when switch saving mode ON', function(){
    //   thermostat.switchSavingMode()
    //   for(i = 0; i < 13; i++) {
    //     thermostat.increase()
    //   }
    //   expect(thermostat.temp).toEqual(32)
    //   thermostat.switchSavingMode()
    //   expect(thermostat.temp).toEqual(25)
    // });

    it('set temperature max when saving mode switched OFF with a temp of 25', function(){
      for(i = 0; i < 5; i++) {
        thermostat.increase()
      }
      thermostat.switchSavingMode()
      expect(thermostat.temp).toEqual(25)
    });

    it('set temperature max when saving mode switched ON with a temp of 32', function(){
      thermostat.switchSavingMode()
      for(i = 0; i < 12; i++) {
        thermostat.increase()
      }
      thermostat.switchSavingMode()
      expect(thermostat.temp).toEqual(25)
    });

    it('set temperature max when saving mode switched OFF with a temp of 10', function(){
      for(i = 0; i < 10; i++) {
        thermostat.decrease()
      }
      thermostat.switchSavingMode()
      expect(thermostat.temp).toEqual(10)
    });

    it('set temperature max when saving mode switched ON with a temp of 10', function(){
      thermostat.switchSavingMode()
      for(i = 0; i < 10; i++) {
        thermostat.decrease()
      }
      thermostat.switchSavingMode()
      expect(thermostat.temp).toEqual(10)
    });
  });

});
