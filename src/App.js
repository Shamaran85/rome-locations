import React, { Component } from 'react';
import './App.css';

let alla = [
  {
    name: 'Saltimbocca Ristorante',
    lat: 41.899230,
    lon: 12.471578,
    url: 'Saltimbocca+ristorante/@41.899230,12.471578',
    image: 'https://s3-media3.fl.yelpcdn.com/bphoto/xBWIo0NGheSPlqM-mnCUAg/348s.jpg',
    distance: 0,
    description: 'Best pasta near Piazza Navona.'
  },
  {
    name: 'La Bottega di Cesare',
    lat: 41.904415,
    lon: 12.477122,
    url: 'La+Bottega+di+Cesare/@41.904415,12.477122',
    image: 'https://media-cdn.tripadvisor.com/media/photo-s/02/b8/a6/9e/la-bottega-di-cesare.jpg',
    distance: 0,
    description: 'Traditional pasta dishes.'
  },
  {
    name: 'Li Rioni a Santiquattro',
    lat: 41.888706,
    lon: 12.497790,
    url: 'Li+Rioni+a+Santiquattro/@41.888706,12.497790',
    image: 'http://lirioni.it/wp-content/uploads/2015/11/Pizzeria-Li-Rioni-Lirioni.it-Locale-03-sm_home_v1.jpg',
    distance: 0,
    description: 'Authentic Italian pizzas.'
  },
  {
    name: 'Trattoria Luzzi',
    lat: 41.889312,
    lon: 12.496638,
    url: 'Ristorante+Colosseo+"Luzzi"/@41.889312,12.496638',
    image: 'https://4.bp.blogspot.com/-sQoqVx2kjyc/V0isH3m7BSI/AAAAAAAAY5g/hLI-vHjaHX09vbNA1QbAW9hwUmTwskR_ACLcB/s1600/1Trattoria%2BLuzzi.jpg',
    distance: 0,
    description: 'Bolognese, Pizza and Lamb.'
  },
  {
    name: 'Dar Poeta Alla Scala',
    lat: 41.890559,
    lon: 12.468671,
    url: 'Dar+Poeta+Alla+Scala/@41.890559,12.468671',
    image: 'https://media-cdn.tripadvisor.com/media/photo-s/11/16/84/d4/photo0jpg.jpg',
    distance: 0,
    description: 'Lunch: Takeaway pizzas'
  },
  {
    name: 'Que Te Pongo',
    lat: 41.898553,
    lon: 12.475358,
    url: 'Que+Te+Pongo/@41.898553,12.475358',
    image: 'http://tavoleromane.files.wordpress.com/2013/04/salmoneria_pic1.jpg',
    distance: 0,
    description: 'Lunch: Best Salmon in Rome.'
  },
  {
    name: 'La Prosciutteria',
    lat: 41.901902,
    lon: 12.484504,
    url: 'Prosciutteria+Trevi+Cantina+dei+Papi/@41.901902,12.484504',
    image: 'https://media-cdn.tripadvisor.com/media/photo-s/14/d6/98/af/photo0jpg.jpg',
    distance: 0,
    description: 'Sandwiches and amazing cold cuts.'
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
      alert("Geolocation is not supported by this browser.");
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
    const lat = this.state.latitude;
    const lon = this.state.longitude;

    let array = [];

    alla.map(item => {
      item.distance = this.getDistance(lat, lon, item.lat, item.lon);
      array.push(item)
    });

    this.setState({ locations: array }, () => {
      this.sortByDistance();
    })
  }

  sortByDistance() {
    const ascLocations = this.state.locations.sort((a, b) => (a.distance) - (b.distance));
    this.setState({ locations: ascLocations })
  }

  haversineDistance(latlngA, latlngB) {
    const toRad = x => (x * Math.PI) / 180;
    const R = 6371;

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
            <h2 className="title">{item.name}</h2>
            <p className="distance">{item.distance}km</p>
            <p className="description">{item.description}</p>
          </div>
        </li>
      )
    });

    return (
      <div className="App">
        <h1>Rome Restaurants</h1>
        <ul>
          {displayAll}
        </ul>


        {/* <button onClick={() => this.sortByDistance()}>Sort</button>  */}

      </div>
    );
  }
}

export default App;
