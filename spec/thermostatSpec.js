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

});
