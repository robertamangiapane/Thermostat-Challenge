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

});
