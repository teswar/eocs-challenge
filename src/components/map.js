import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';

import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const style = {
  position: 'relative',
  width: '100%',
  height: '100%',
};

export class MapCom extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { submissions, submission, google } = this.props;
    var mapProps = { google, style, zoom: 8,  mapTypeId: 'satellite', initialCenter: { lat: 47.444, lng: -122.176 }, bounds : new google.maps.LatLngBounds() };
    var point = null;

    const markers = ((!submission) ? submissions : [submission]).reduce((result, m) => {
      point = { lat: Number( m.location.lat), lng: Number(m.location.lon) };
      result.push(<Marker key={m.id} position={point} />);
      mapProps.bounds.extend(point);
      mapProps.center = point;
      return result;
    }, [])

    console.log(mapProps, markers.length);
    return (
      <Map {...mapProps} >
        {markers}
      </Map>
    );
  }
}

export const GMap = GoogleApiWrapper({ apiKey: 'AIzaSyAaiRbYTZxNwmzUtw6JYI6uNOtyac3fIC4' })(MapCom);