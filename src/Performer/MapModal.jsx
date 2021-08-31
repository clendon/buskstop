import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class MainMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [
        {
          title: '',
          name: '',
          position: { lat: 31.9685988, lng: -99.9018131 }
        }
      ]
    };
    this.onClick = this.onClick.bind(this);
  }



  onClick(t, map, coord) {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    console.log(lat,lng)
    this.props.check(t);

    this.setState(previousState => {
      return {
        markers: [
          {
            title: '',
            name: '',
            position: { lat, lng },
          }
        ]
      };
    });
  }

  render() {
    console.log(this.state.markers)
    return (
      <div>
        <h1 className="text-center">My Maps</h1>
        <button className = "w-screen">Submit</button>
        <Map
          google={this.props.google}
          style={{ width: "100%", margin: "auto" }}
          className={"map"}
          zoom={13}
          onClick={this.onClick}
          initialCenter={{
            lat: 30.267153,
            lng: -97.74306079999999,
          }}
        >
          {this.state.markers.map((marker, index) => (
            <Marker
              key={index}
              title={marker.title}
              name={marker.name}
              position={marker.position}
            />
          ))}
        </Map>
      </div>
    );
  }
}

const MapModal = GoogleApiWrapper({
  apiKey: ('AIzaSyDwPdu7_GgYmhtya_XixbdpYJ0KeMfkbJ8')
})(MainMap);

export default MapModal;
