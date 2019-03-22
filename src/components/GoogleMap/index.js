import GoogleMap from './GoogleMap';
import { GoogleApiWrapper } from 'google-maps-react';

export default GoogleApiWrapper({
  apiKey: 'your api key'
})(GoogleMap);