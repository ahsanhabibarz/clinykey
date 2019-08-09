import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapGroup extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={{ width: "100%", height: "100%" }}
      >
        <Marker onClick={this.onMarkerClick} name={"Current location"} />

        <InfoWindow onClose={this.onInfoWindowClose}>
          <div>
            <h1>{"My place"}</h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBDdmM2_otTdpt0zFW_7Y7x_ScpedIN7_g"
})(MapGroup);
