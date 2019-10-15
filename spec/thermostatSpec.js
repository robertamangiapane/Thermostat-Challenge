describe("Thermostat", function(){

  beforeEach(function(){
    thermostat = new Thermostat();
  });

  it("knows temperature degrees", function(){
    expect(thermostat.temp).toEqual(20);
  });

  describe("up", function() {

    it('increments the temp', function() {
      thermostat.up();
      expect(thermostat.temp).toEqual(21)
    });

    it('doesnt go above the maximum temperature when powerSaving is true', function() {
      for(i = 0; i < 100; i++) {
        thermostat.up();
      }
      expect(thermostat.temp).toEqual(25);
    });

    it('doesnt go above the maximum temperature when powerSaving is false', function() {
      thermostat.savingMode = false
      for(i = 0; i < 100; i++) {
        thermostat.up();
      }
      expect(thermostat.temp).toEqual(32);
    });

  });

  describe("down", function() {

    it('descrease the temp', function() {
      thermostat.down();
      expect(thermostat.temp).toEqual(19)
    });

    it('doesnt go below the minimum temperature', function() {
      for(i = 0; i < 100; i++) {
        thermostat.down();
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
        thermostat.down()
      }
      expect(thermostat.energyUsage()).toEqual("low-usage");
    });

    it('returns the current usage as high', function(){
      for(i = 0; i < 6; i++) {
        thermostat.up()
      }
      expect(thermostat.energyUsage()).toEqual("high-usage");
    });

  });

});
