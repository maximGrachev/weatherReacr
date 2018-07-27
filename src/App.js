import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const PLACES = [
  { name: "Moscow", zip: "Moscow" },
  { name: "Zaraysk", zip: "Zaraysk" },
  { name: "Lukhovitsy", zip: "Lukhovitsy" },
  { name: "Kolomna", zip: "Kolomna" },
  { name: "Ryazan", zip: "Ryazan" }
];

class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null
    };
  }
  componentDidMount() {
    const zip = this.props.zip;
    const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
      zip +
      "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial";
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
  }
  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <div className="loading">Loading...</div>;
    const weather = weatherData.weather[0];
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
    return (
      <div>
        <h1>
          {weather.main} in <p className="cityName">{weatherData.name}</p>
          <img src={iconUrl} alt={weatherData.description} />
        </h1>
        <p>Current: {Math.round((weatherData.main.temp - 32) * 50 / 9) / 10}°</p>
        <p>High: {Math.round((weatherData.main.temp_max - 32) * 50 / 9) / 10}°</p>
        <p>Low: {Math.round((weatherData.main.temp_min - 32) * 50 / 9) / 10}°</p>
        <p>Wind Speed: {Math.round(weatherData.wind.speed * 44.704) / 100} m/s</p>
      </div>
    );
  }
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0,
    };
  }
  render() {
    const activePlace = this.state.activePlace;

    return (
      <div className="App">
        <div className="buttons">
          {PLACES.map((place, index) => (
            <button
              key={index}
              onClick={() => {
                this.setState({ activePlace: index });
                this.className = 'pressedButton';
                console.log(this);
              }}
            >

              {place.name}
            </button>
        ))}
        </div>

        <WeatherDisplay
            key={activePlace}
            zip={PLACES[activePlace].zip}
          />
        </div>
        );
      }
    }
    
    
    
    export default App;
