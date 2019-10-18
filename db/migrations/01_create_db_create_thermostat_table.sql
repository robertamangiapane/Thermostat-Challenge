CREATE DATABASE thermostat;
 \c thermostat
CREATE TABLE settings (id SERIAL PRIMARY KEY, temp INT, savingMode VARCHAR(10), city VARCHAR(100));
