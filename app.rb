require 'sinatra/base'
require './database_connection'

class ThermostatApp < Sinatra::Base

  before do
    DatabaseConnection.setup('thermostat')
  end

  get '/' do

  end

  post '/' do
    DatabaseConnection.query('TRUNCATE settings;')
    DatabaseConnection.query("INSERT INTO settings
        (temp, savingMode, city)
        VALUES ('#{params[:temp]}', '#{params[:savingMode]}', '#{params[:city]}')
        RETURNING id ")
    nil
  end


end
