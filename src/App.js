import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {


  mapsSelector() {
    if /* if we're on iOS, open in Apple Maps */
      ((navigator.platform.indexOf("iPhone") != -1) ||
      (navigator.platform.indexOf("iPad") != -1) ||
      (navigator.platform.indexOf("iPod") != -1))
      // window.open("maps://maps.google.com/maps?daddr=<lat>,<long>&amp;ll=");
      window.open("maps://maps.google.com/maps?daddr=56.069196,12.699620&amp;ll=");
    else /* else use Google */
      window.open("https://maps.google.com/maps?daddr=<lat>,<long>&amp;ll=");
  }


  render() {
    return (
      <div className="App">

        <button onClick={() => this.mapsSelector()}>Butt</button>
        {/* <img src="directions-icon.png" onclick="mapsSelector()" /> */}

        {/* <a href="https://www.google.se/maps/dir/Johan+H%C3%A5rds+gata+72,+254+54+Helsingborg,+Sverige/ICA+N%C3%A4ra+Kurir+Livs,+Kurirgatan+1,+254+53+Helsingborg/">Ica Nära</a> */}
      </div>
    );
  }
}

export default App;
