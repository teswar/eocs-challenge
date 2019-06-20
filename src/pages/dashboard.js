import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { extendWithListing } from '../core/hocs'
import { Submissions } from '../components'
import GoogleMapReact from 'google-map-react';
// import { GoogleMap, Marker, withScriptjs, withGoogleMap } from "react-google-maps"

const AnyReactComponent = ({ text }) => <div>{text}</div>;

// const MyMapComponent = withScriptjs(withGoogleMap((props) =>
//   <GoogleMap
//     defaultZoom={8}
//     defaultCenter={{ lat: -34.397, lng: 150.644 }}
//   >
//     {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
//   </GoogleMap>
// ))

class SimpleMap extends Component {
    static defaultProps = {
      center: {
        lat: 59.95,
        lng: 30.33
      },
      zoom: 11
    };
   
    render() {
      return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyAaiRbYTZxNwmzUtw6JYI6uNOtyac3fIC4' }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <AnyReactComponent
              lat={59.955413}
              lng={30.337844}
              text="My Marker"
            />
          </GoogleMapReact>
        </div>
      );
    }
  }
   
  export default SimpleMap;


export class DashboardPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <div>
                    <Submissions />
                    {/* <MyMapComponent isMarkerShown /> */}
                    <SimpleMap/>
                </div>
            </Fragment>
        );
    }
}