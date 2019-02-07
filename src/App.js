import React, { Component } from 'react';
import './App.css';





// Data

// Pizza

// La Renella Forno Antico Trastevere
// La+Renella+Forno+Antico+Trastevere/@41.8907907,12.4706911
// Via del Moro, 15, 00153 Roma RM, Italien
// Öppet: 07:00 - 24:00
// They are famous for their breaded vegetable appetizer, home made fettucini (Bolognese or Cozze e Vongole), as well as their meats, especially the lamb! 

// Dar Poeta Alla Scala
// Dar+Poeta+Alla+Scala/@41.8905578,12.468671
// Via della Scala, 73, 00153 Roma RM, Italien
// Öppet: 10:30  - 02:00




let alla = [
  {
    name: 'La Bottega di Cesare',
    lat: 41.904415,
    lon: 12.477122,
    url: 'La+Bottega+di+Cesare/@41.904415,12.477122',
    image: 'https://media-cdn.tripadvisor.com/media/photo-s/02/b8/a6/9e/la-bottega-di-cesare.jpg',
    distance: 0,
    description: 'Dinner: Great Pasta'
  },
  {
    name: 'Saltimbocca Ristorante',
    lat: 41.899230,
    lon: 12.471578,
    url: 'Saltimbocca+ristorante/@41.899230,12.471578',
    image: 'https://s3-media3.fl.yelpcdn.com/bphoto/xBWIo0NGheSPlqM-mnCUAg/348s.jpg',
    distance: 0,
    description: 'Dinner: Great Pizzas'
  },
]

class App extends Component {
  state = {
    locations: [],
    latitude: null,
    longitude: null
  }

  componentDidMount() {
    this.getGeoLocation();
  }

  getGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => this.setGeoLocation(position));
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  setGeoLocation(position) {
    const longitude = position.coords.longitude;
    const latitude = position.coords.latitude;

    this.setState({ longitude, latitude }, () => {
      this.setRestaurants();
    });
  }

  setRestaurants() {
    alla.map(item => {
      item.distance = this.getDistance(this.state.latitude, this.state.longitude, item.lat, item.lon);
      this.setState(prevState => ({
        locations: [...prevState.locations, item]
      }));
    });
  }

  haversineDistance(latlngA, latlngB) {
    const toRad = x => (x * Math.PI) / 180;
    const R = 6371; // km

    const dLat = toRad(latlngB[0] - latlngA[0]);
    const dLatSin = Math.sin(dLat / 2);
    const dLon = toRad(latlngB[1] - latlngA[1]);
    const dLonSin = Math.sin(dLon / 2);

    const a = (dLatSin * dLatSin) +
      (Math.cos(toRad(latlngA[1])) * Math.cos(toRad(latlngB[1])) * dLonSin * dLonSin);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = Math.floor(R * c) + 'meters';

    return distance;
  }

  getDistance(lat1, lon1, lat2, lon2) {
    const radlat1 = Math.PI * lat1 / 180;
    const radlat2 = Math.PI * lat2 / 180;
    const theta = lon1 - lon2;
    const radtheta = Math.PI * theta / 180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;

    let result = Math.round(dist * 10) / 10;

    return result
  }

  goToMap(item) {
    const url = item.url;

    if ((navigator.platform.indexOf("iPhone") !== -1) || (navigator.platform.indexOf("iPad") !== -1) || (navigator.platform.indexOf("iPod") !== -1)) {
      window.open("maps://maps.google.com/maps?dirflg=w&daddr=" + url);
    } else {
      window.open("https://maps.google.com/maps?dirflg=w&daddr=" + url);
    }
  }

  render() {
    const { locations } = this.state;

    let displayAll = locations.map((item, index) => {
      return (
        <li key={index} onClick={() => this.goToMap(item)}>
          <div className="left">
            <div className="image-container">
              <img src={item.image} alt={item.name} />
            </div>
          </div>


          <div className="right">
            <h2>{item.name}</h2>
            <p className="description">{item.description}</p>
            <p className="distance">{item.distance}km</p>
          </div>

        </li>
      )
    })

    return (
      <div className="App">
        {/* <h1>{this.state.latitude}, {this.state.longitude}</h1> */}
        <h1>Rome Restaurants</h1>
        <ul>
          {displayAll}
        </ul>
        {/* <p> {userPosition} </p> */}

        {/* <button onClick={() => this.mapsSelector(userPosition)}>Butt</button> */}
        {/* <button onClick={() => this.haversineDistance([56.070858, 12.697843], [56.044505, 12.692611])}>hehe</button> */}

        {/* <p>{this.state.locations[0].url}</p> */}
        {/* <img src="directions-icon.png" onclick="mapsSelector()" /> */}

        {/* <a href="https://www.google.se/maps/dir/Johan+H%C3%A5rds+gata+72,+254+54+Helsingborg,+Sverige/ICA+N%C3%A4ra+Kurir+Livs,+Kurirgatan+1,+254+53+Helsingborg/">Ica Nära</a> */}
      </div>
    );
  }
}

export default App;
