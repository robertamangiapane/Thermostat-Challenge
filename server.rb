require 'sinatra/base'
require './database_connection'
require 'json'

class ThermostatApp < Sinatra::Base

  before do
    DatabaseConnection.setup('thermostat')
  end

  get '/' do
    result = DatabaseConnection.query("SELECT * FROM settings;")
    data = result.ntuples.zero? ? "" : result[0]
    JSON.generate(data)
  end

  post '/' do
    DatabaseConnection.query('TRUNCATE settings;')
    DatabaseConnection.query("INSERT INTO settings
        (temp, savingMode, city)
        VALUES ('#{params[:temp]}', '#{params[:savingMode]}', '#{params[:city]}')")
    nil
  end
end
