import React, { Component } from 'react';
import logo from './logo.svg';
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
    name: 'Ica',
    cords: [56.0655745, 12.6302616],
    url: 'maps.google.com/maps?dirflg=w&daddr=ICA+Nära+Kurir+Livs,+Kurirgatan+1,+254+53+Helsingborg/@56.0655745,12.6302616',
    distance: 0
  },
  {
    name: 'Aktiverum',
    cords: [56.065210, 12.709134],
    url: 'maps.google.com/maps?dirflg=w&daddr=Studio+Aktiverum+AB/@56.065196,12.706942',
    distance: 0
  },
]


class App extends Component {
  state = {
    userPosition: [],
    locations: []
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

    const userCords = this.state.userPosition.concat(longitude, latitude);

    this.setState({ userPosition: userCords }, () => {
      this.setRestaurants();
    });
  }

  setRestaurants() {
    const userPosition = this.state.userPosition;

    alla.map(item => {
      item.distance = this.haversineDistance(userPosition, item.cords);
      this.setState(prevState => ({
        locations: [...prevState.locations, item]
      }))
    })
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
    let distance = R * c;

    return distance;
  }

  mapsSelector(showInfo) {
    console.log('R2:', this.state.restaurants);
    const uno = this.state.locations[0].url;
    console.log('Shou', showInfo);
    if /* if we're on iOS, open in Apple Maps */
      ((navigator.platform.indexOf("iPhone") != -1) ||
      (navigator.platform.indexOf("iPad") != -1) ||
      (navigator.platform.indexOf("iPod") != -1))
      // window.open("maps://maps.google.com/maps?daddr=<lat>,<long>&amp;ll=");
      // window.open("maps://maps.google.com/maps?dirflg=w&daddr=56.069196,12.699620&amp;ll=");
      // window.open("maps://maps.google.com/maps?dirflg=w&daddr=ICA+Nära+Kurir+Livs,+Kurirgatan,+Helsingborg&amp;ll=");
      // window.open("maps://maps.google.com/maps?dirflg=w&daddr=ICA+Nära+Kurir+Livs,+Kurirgatan+1,+254+53+Helsingborg/@56.0655745,12.6302616");
      window.open("maps://" + uno);
    else /* else use Google */
      // window.open("https://maps.google.com/maps?daddr=56.069196,12.699620&amp;ll=");
      window.open("https://" + uno);
  }


  goToMap(item) {
    const url = item.url;

    if /* if we're on iOS, open in Apple Maps */
      ((navigator.platform.indexOf("iPhone") !== -1) ||
      (navigator.platform.indexOf("iPad") !== -1) ||
      (navigator.platform.indexOf("iPod") !== -1))
      window.open("maps://" + url);
    else /* else use Google */
      // window.open("https://maps.google.com/maps?daddr=56.069196,12.699620&amp;ll=");
      window.open("https://" + url);

  }

  render() {

    const { locations } = this.state;

    let displayAll = locations.map((item, index) => {
      return (
        <li key={index} onClick={() => this.goToMap(item)}>
          {item.name}
        </li>
      )
    })


    return (
      <div className="App">
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
