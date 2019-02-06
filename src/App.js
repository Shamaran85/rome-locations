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


class App extends Component {
  state = {
    restaurants: [],
    myCurrentLocation: null,
    selectedLocation: null
  }


  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  showPosition(position) {
    alert("Latitude: " + position.coords.latitude +
      " Longitude: " + position.coords.longitude);
  }


  distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1 / 180
    var radlat2 = Math.PI * lat2 / 180
    var radlon1 = Math.PI * lon1 / 180
    var radlon2 = Math.PI * lon2 / 180
    var theta = lon1 - lon2
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    if (unit == "K") { dist = dist * 1.609344 }
    if (unit == "N") { dist = dist * 0.8684 }
    return dist
  }


  mapsSelector() {
    if /* if we're on iOS, open in Apple Maps */
      ((navigator.platform.indexOf("iPhone") != -1) ||
      (navigator.platform.indexOf("iPad") != -1) ||
      (navigator.platform.indexOf("iPod") != -1))
      // window.open("maps://maps.google.com/maps?daddr=<lat>,<long>&amp;ll=");
      // window.open("maps://maps.google.com/maps?dirflg=w&daddr=56.069196,12.699620&amp;ll=");
      // window.open("maps://maps.google.com/maps?dirflg=w&daddr=ICA+Nära+Kurir+Livs,+Kurirgatan,+Helsingborg&amp;ll=");
      window.open("maps://maps.google.com/maps?dirflg=w&daddr=ICA+Nära+Kurir+Livs,+Kurirgatan+1,+254+53+Helsingborg/@56.0655745,12.6302616");
    else /* else use Google */
      window.open("https://maps.google.com/maps?daddr=56.069196,12.699620&amp;ll=");
  }


  render() {
    return (
      <div className="App">

        <button onClick={() => this.mapsSelector()}>Butt</button>
        <button onClick={() => this.getLocation()}>Get Location</button>
        {/* <img src="directions-icon.png" onclick="mapsSelector()" /> */}

        {/* <a href="https://www.google.se/maps/dir/Johan+H%C3%A5rds+gata+72,+254+54+Helsingborg,+Sverige/ICA+N%C3%A4ra+Kurir+Livs,+Kurirgatan+1,+254+53+Helsingborg/">Ica Nära</a> */}
      </div>
    );
  }
}

export default App;
