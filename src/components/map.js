import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const style = {
  position: 'relative',
  width: '100%',
  height: '100%',
};

export class ExtendedMap extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { submissions, submission, google } = this.props;
    var mapProps = { google, style, zoom: 8, mapTypeId: 'satellite', initialCenter: { lat: 9.4873703, lng: 73.5735097 }, bounds: new google.maps.LatLngBounds() };
    var point = null;

    const markers = ((!submission) ? submissions : [submission]).reduce((result, m) => {
      point = { lat: Number(m.location.lat), lng: Number(m.location.lon) };
      result.push(<Marker key={m.id} position={point} />);
      mapProps.bounds.extend(point);
      mapProps.center = point;
      return result;
    }, [])

    return (
      <Map {...mapProps}>
        {markers}
      </Map>
    );
  }
}

export const GMap = GoogleApiWrapper({ apiKey: 'AIzaSyAaiRbYTZxNwmzUtw6JYI6uNOtyac3fIC4' })(ExtendedMap);