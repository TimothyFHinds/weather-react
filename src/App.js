import React from 'react';
import Weather from './components/weather/weather.component';
import Form from './components/form/form.component';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';

const APIKey = '47a0dea07d3f141d56ad04eac6c57169';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false
    };

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }

  getCelsius(temp) {
    let cel = Math.floor(temp - 273.15);
    return cel;
  }

  getFarenheit(temp) {
    let far = Math.floor(temp * 1.8) + 32;
    return far
  }

  getIcon(icons, range) {
    switch(true) {
      case range >= 200 && range <= 232:
        this.setState({icon: this.weatherIcon.Thunderstorm})
        break;
      case range >= 300 && range <= 321:
        this.setState({icon: this.weatherIcon.Drizzle})
        break;
      case range >= 500 && range <= 531:
        this.setState({icon: this.weatherIcon.Rain})
        break;
      case range >= 600 && range <= 622:
        this.setState({icon: this.weatherIcon.Snow})
        break;
      case range >= 701 && range <= 781:
        this.setState({icon: this.weatherIcon.Atmosphere})
        break;
      case range === 800:
        this.setState({icon: this.weatherIcon.Clear})
        break;
      case range >= 801 && range <=804:
        this.setState({icon: this.weatherIcon.Clouds})
        break;
      default:
        this.setState({icon: this.weatherIcon.Clouds})
        
           
    }
  }

  getWeather = async (e) => {
    
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if (city && country) {
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${APIKey}`)

      const response = await api_call.json();

      console.log(response);

      this.setState({
        city: `${response.name}, ${response.sys.country}`,
        country: response.sys.country,
        celsius: this.getCelsius(response.main.temp),
        temp_max: this.getCelsius(response.main.temp_max),
        temp_min: this.getCelsius(response.main.temp_min),
        description: response.weather[0].description,
        error: false
      });

      this.getIcon(this.weatherIcon, response.weather[0].id);

    } else {
        this.setState({error: true});
      }
      
    
  };


  state = {}
  render() {
    return (
      <div className="App">

        <Form 
          loadweather={this.getWeather}
          error={this.state.error}
        />

        <Weather 
        city={this.state.city} 
        country={this.state.country} 
        temp_celsius={this.state.celsius}
        temp_max={this.state.temp_max}
        temp_min={this.state.temp_min}
        description={this.state.description}
        weatherIcon={this.state.icon}
        />
      </div>
    );
  }
}


export default App;
