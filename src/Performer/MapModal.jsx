import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import config from '../../env/config';
class MainMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marker:
        {
          title: '',
          name: '',
          position: {
            lat: null,
            lng: null,
          }
        }

    };
    this.onClick = this.onClick.bind(this);
  }

  changeCoord(e) {
    const lat = this.state.marker.position.lat
    const long = this.state.marker.position.lat
    if ( lat === null &&  long === null){
      alert('Please select a location')
    } else {
      this.props.setNewCoord(this.state.marker.position)
      this.props.setMapOpen(false)
    }
  }

  onClick(t, map, coord) {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    this.props.check(t);

    this.setState({
        marker:
          {
            title: '',
            name: '',
            position: { lat, lng },
          }
    });
  }

  render() {
    console.log(this.props.latLng)
    return (
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-40 outline-none focus:outline-none">
        <button type="button" onClick={(e)=>this.changeCoord(e)} className="text-center fixed bottom-0 z-50 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit Location</button>
        <Map
          google={this.props.google}
          style={{ width: "100%", margin: "auto" }}
          className={"map"}
          zoom={13}
          onClick={this.onClick}
          initialCenter={{
            lat: this.props.latLng.lat,
            lng: this.props.latLng.lng,
          }}
        >
            <Marker
              title={this.state.marker.title}
              name={this.state.marker.name}
              position={this.state.marker.position}
            />
        </Map>
      </div>
    );
  }
}

const MapModal = GoogleApiWrapper({
  apiKey: ('')
})(MainMap);

export default MapModal;
