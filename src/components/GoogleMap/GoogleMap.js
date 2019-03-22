import React, { PureComponent } from 'react';
import mockData from './mockData';
import { Map, Marker } from 'google-maps-react';
import supercluster from 'points-cluster';
import wrapStyles from './styles/mapWrap';
import mapStyles from './styles/map';
import clusterIcon from './img/clusterIcon.svg';

const memo = {};

const memoize = (func, name) => {
  if (!memo[name]) {
    memo[name] = func();
  }

  return memo[name];
};

class GoogleMap extends PureComponent {
  state = {
    bounds: null,
    center: mockData[0],
    zoom: null
  };

  componentDidMount() {
    this.initBounds();
  }

  initBounds = () => {
    const bounds = new this.props.google.maps.LatLngBounds();
    mockData.forEach(point => {
      bounds.extend(point);
    });

    this.setState(
      { bounds },
      this.setBounds
    );
  };

  setBounds = (zoom = 15) => {
    // try adding setInterval
    if (zoom !== this.state.zoom) {
      zoom = zoom || this.state.zoom;
      const { bounds } = this.state;

      const normalizedBounds = {
        nw: {
          lat: bounds.getNorthEast().lat(),
          lng: -bounds.getNorthEast().lng()
        },
        se: {
          lat: bounds.getSouthWest().lat(),
          lng: -bounds.getSouthWest().lng()
        }
      };

      const clusters = memoize(() => {
        return supercluster(mockData, { radius: 80 })({
          bounds: normalizedBounds, zoom
        });
      }, zoom);

      this.setState({ clusters, center: mockData[0], zoom });
    }
  };

  renderClusters = () => {
    const { clusters } = this.state;

    if (!clusters) {
      return null;
    }

    return clusters.map((cluster, i) => {
      const { numPoints, x, y } = cluster;

      if (numPoints === 1) {
        return (
          <Marker
            key={`cluster_${i}`}
            position={{ lat: y, lng: x }}
          />
        );
      } else {
        return (
          <Marker
            key={`cluster_${i}`}
            label={{
              color: '#fff',
              text: String(numPoints)
            }}
            position={{ lat: y, lng: x }}
            style={{ color: '#fff' }}
            icon={{
              url: clusterIcon
            }}
          />
        );
      }
    });
  };

  render() {
    const { center, zoom } = this.state;

    return (
      <div style={wrapStyles}>
        {
          center && (
            <Map
              ref={node => this.map = node}
              google={this.props.google}
              zoom={zoom}
              style={mapStyles}
              initialCenter={center}
              onReady={(props, map) => {
                map.addListener('zoom_changed', () => {
                  this.setBounds(map.zoom);
                });
              }}
            >
              {this.renderClusters()}
            </Map>
          )
        }
      </div>
    );
  }
}

// TODO: add memoization

export default GoogleMap;