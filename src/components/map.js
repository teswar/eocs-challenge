import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { extendWithListing } from '../core/hocs'
import { Submissions } from '../components'
// import GoogleMapReact from 'google-map-react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

// // import { GoogleMap, Marker, withScriptjs, withGoogleMap } from "react-google-maps"
// const K_WIDTH = 40;
// const K_HEIGHT = 40;

// const greatPlaceStyle = {
//   // initially any map object has left top corner at lat lng coordinates
//   // it's on you to set object origin to 0,0 coordinates
//   position: 'absolute',
//   width: K_WIDTH,
//   height: K_HEIGHT,
//   left: -K_WIDTH / 2,
//   top: -K_HEIGHT / 2,

//   border: '5px solid #f44336',
//   borderRadius: K_HEIGHT,
//   backgroundColor: 'white',
//   textAlign: 'center',
//   color: '#3f51b5',
//   fontSize: 16,
//   fontWeight: 'bold',
//   padding: 4
// };


// const AnyReactComponent = ({ text }) => <div>{text}</div>;
const mapStyles = {
  width: '100%',
  height: '100%',
};

export class MapCom extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const { submissions } = this.props;
    return (
      <Map google={this.props.google} zoom={8} style={mapStyles} initialCenter={{ lat: 47.444, lng: -122.176 }} >
        <Marker position={{ lat: 48.058439, lng: 16.351187 }} />
      </Map>
    );
  }
}

export const GMap = GoogleApiWrapper({ apiKey: 'AIzaSyAaiRbYTZxNwmzUtw6JYI6uNOtyac3fIC4' })(MapCom);



// export class GMap extends Component {
//     static defaultProps = {
//       center: {
//         lat: 59.95,
//         lng: 30.33
//       },
//       zoom: 11
//     };

//     render() {
//       return (
//         // Important! Always set the container height explicitly
//         <div style={{ height: '100vh', width: '100%' }}>
//           <GoogleMapReact
//             bootstrapURLKeys={{ key: 'AIzaSyAaiRbYTZxNwmzUtw6JYI6uNOtyac3fIC4' }}
//             defaultCenter={this.props.center}
//             defaultZoom={this.props.zoom}
//           >
//             <AnyReactComponent style={greatPlaceStyle}
//               lat={59.955413}
//               lng={30.337844}
//               text="My Marker"
//             />
//           </GoogleMapReact>
//         </div>
//       );
//     }
//   }
