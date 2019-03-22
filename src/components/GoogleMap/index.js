import GoogleMap from './GoogleMap';
import { GoogleApiWrapper } from 'google-maps-react';

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBGv0KVuJJgvgkDIz3EXM1Td83ZFmHw3xY'
})(GoogleMap);