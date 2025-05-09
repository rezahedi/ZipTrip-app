import React, { useEffect } from 'react'
import {APIProvider, Map, useMap} from '@vis.gl/react-google-maps';
import PropTypes from 'prop-types';

const fakeStops = [
  {
    name: "The Pergola at Lake Merritt",
    location: [37.8087617744117, -122.2497050912179]
  },
  {
    name: "Lake Merritt Labyrinth",
    location: [37.80742823485923, -122.25397875958909]
  },
  {
    name: "Bonsai Garden",
    location: [37.806107266138106, -122.25849128954741]
  },
  {
    name: "Mid Century Monster",
    location: [37.80710909515832, -122.26061280682225]
  },
  {
    name: "Fairyland Hill",
    location: [37.80992590348893, -122.2610334734226]
  },  
];

const MarkersAndPath = ({stops}) => {
  //TODO: Use stops to create markers and path
  console.log(stops);

  const map = useMap();

  useEffect(() => {
    if (!map || !window.google) return;

    const gmaps = window.google.maps;
    const bounds = new gmaps.LatLngBounds();

    // Create markers and info windows for each stop
    const infoWindow = new gmaps.InfoWindow();
    fakeStops.forEach((stop, index) => {
      const position = {
        lat: stop.location[0],
        lng: stop.location[1],
      };

      // Extend bounds to include this stop
      bounds.extend(position);

      const marker = new gmaps.Marker({
        position,
        map,
        title: stop.name,
        label: `${index + 1}`,
      });

      // Set custom content (can be HTML)
      const content = `
        <div style="max-width:200px">
          <h3>${stop.name}</h3>
          <p>Lat: ${stop.location[0].toFixed(5)}<br>Lng: ${stop.location[1].toFixed(5)}</p>
          <img src="https://via.placeholder.com/150" alt="${stop.name}" style="width:100%;height:auto;border-radius:4px;" />
        </div>
      `;

      // Add click listener to marker
      marker.addListener("click", () => {
        infoWindow.setContent(content);
        infoWindow.open(map, marker);
      });

      // Fit map to bounds once all markers are placed
      map.fitBounds(bounds);
    });
  }, [map]);

  return null;
};

const StopsOnMap = () => {
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
      <Map
        style={{width: '100%', height: '100%'}}
        gestureHandling={'greedy'}
        options={{
          disableDefaultUI: true,
        }}
      />
      <MarkersAndPath />
    </APIProvider>
  )
}

StopsOnMap.propTypes = {
  stops: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    imageURL: PropTypes.string,
    address: PropTypes.string,
    location: PropTypes.arrayOf(PropTypes.number),
  })),
}

export default StopsOnMap