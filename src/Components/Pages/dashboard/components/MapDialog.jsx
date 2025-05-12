import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useMap, Map, Marker } from "@vis.gl/react-google-maps";
import AutocompleteWebComponent from "./AutocompleteWebComponent";

// Default center and zoom level to show entire United States on the map
const DEFAULT_CENTER = { lat: 39.8283, lng: -98.5795 };
const DEFAULT_ZOOM = 4;

const MapDialog = ({ isOpen, onClose, onConfirm }) => {
  const dummyDiv = useRef(null);
  const [selected, setSelected] = useState(null);
  const [placeId, setPlaceId] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const isMobile = window.innerWidth < 600;
  const [placeSelect, setPlaceSelect] = useState(null);
  const map = useMap();

  useEffect(() => {
    if (!placeSelect || !placeSelect.viewport || !map) return;
    map.fitBounds(placeSelect.viewport);
  }, [placeSelect]);

  const handleMapClick = (e) => {
    if (!e.detail.placeId) return;
    setSelected(e.detail.latLng);
    setPlaceId(e.detail.placeId);
  };

  useEffect(() => {
    if (!placeId || !window.google || !dummyDiv.current) return;

    const service = new window.google.maps.places.PlacesService(
      dummyDiv.current,
    );

    service.getDetails(
      {
        placeId,
        fields: [
          "name",
          "formatted_address",
          "geometry.location",
          "photos",
          "place_id",
        ],
      },
      (place, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          place
        ) {
          const location = place.geometry.location;
          const lat = location.lat();
          const lng = location.lng();
          const imageURL = place.photos?.[0]?.getUrl({ maxWidth: 400 }) || null;

          setSelectedPlace({
            name: place.name,
            address: place.formatted_address,
            location: [lat, lng],
            imageURL,
          });
        } else {
          console.warn("Failed to fetch place details:", status);
        }
      },
    );
  }, [placeId]);

  const handleAdd = () => {
    onConfirm(selectedPlace);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md"
      fullScreen={isMobile}
    >
      <Box style={{ padding: "10px 30px" }}>
        <DialogTitle id="alert-dialog-title">Select a Place</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box sx={{ width: { sx: "100%", sm: "600px" }, height: "500px" }}>
              <AutocompleteWebComponent onPlaceSelect={setPlaceSelect} />
              <Map
                defaultCenter={
                  selected
                    ? { lat: selected.lat, lng: selected.lng }
                    : DEFAULT_CENTER
                }
                defaultZoom={selected ? 15 : DEFAULT_ZOOM}
                style={{ width: "100%", height: "90%" }}
                onClick={handleMapClick}
                disableDefaultUI={false}
                options={{
                  gestureHandling: "greedy",
                  streetViewControl: false,
                }}
              >
                {selected && (
                  <Marker position={{ lat: selected.lat, lng: selected.lng }} />
                )}
              </Map>
              <div ref={dummyDiv} style={{ display: "none" }} />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            style={{
              backgroundColor: "white",
              color: "black",
              border: "1px solid darkgray",
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleAdd} disabled={!placeId}>
            Add
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

MapDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default MapDialog;
