$(document).ready(function() {
  var thermostat = new Thermostat();
  $.get('http://localhost:4567', function(data){
    console.log (data.temperature)
    thermostat.temperature = data.temperature
    updateTemperature();
  });
   displayWeather('London'); 


  $('#temp-up').click(function() {
    thermostat.up();
    updateTemperature();
  });

  $('#temp-down').click(function() {
    thermostat.down();
    updateTemperature();

  });

  $('#temp-reset').click(function() {
    thermostat.resetTemperature ();
    updateTemperature();
  });

  $('#psm-on').click(function() {
    thermostat.switchPowerSavingModeOn();
    $('#power-saving').text('on')
    updateTemperature();
  })

  $('#psm-off').click(function() {
    thermostat.switchPowerSavingModeOff();
    $('#power-saving').text('off')
    updateTemperature();
  })

  $('#current-city').change(function() {
   var city = $('#current-city').val();
   displayWeather(city)
 })

  $('#submit').click(function(event) {
   event.preventDefault();
   var city = $('#write-city').val();
   console.log(city)
   displayWeather(city);
  })

  function updateTemperature() {
    $('#temperature').text(thermostat.getCurrentTemperature());
    $('#temperature').attr('class', thermostat.energyUsage());
    $.post('http://localhost:4567', {temp: thermostat.getCurrentTemperature()});
  }

  function displayWeather(city){
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city;
    var token = '&appid=a3d9eb01d4de82b9b8d0849ef604dbed';
    var units = '&units=metric';
    $.get(url + token + units, function (data){
      $('#current-temperature').text(data.main.temp);
    })
  }
});
