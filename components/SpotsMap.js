import React from "react";
import styled from "styled-components";
import Map, { Marker, Popup } from "react-map-gl";
import { useSpotStore } from "../public/stores/spotStore";
import { useState } from "react";
import { MdLocationPin } from "react-icons/md";

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  /* overflow: hidden; */
  z-index: 0;
  .attribution-control {
    display: none;
  }
`;

const StyledMarker = styled.div`
  color: #f2500a;

  &:hover {
    color: #fcbf8d;
  }
`;

const StyledPopup = styled(Popup)`
  .mapboxgl-popup-content {
    border-radius: 25px;
    padding: 10px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .mapboxgl-popup-close-button {
    position: absolute;
    top: 14px;
    right: 14px;
    padding: 6px 9px 6px 9px;
    background-color: #fff;
    border-radius: 50%;
    cursor: pointer;

    background-color: #fcbf8d;

    &:hover {
      background-color: #f2500a;
    }
  }
`;

const initialViewState = {
  longitude: 13.381777,
  latitude: 52.531677,
  zoom: 10,
};

export default function SpotsMap() {
  const { spots } = useSpotStore();
  const [selectedSpot, setSelectedSpot] = useState(null);

  const validSpots = spots.filter(
    (spot) => spot.longitude !== undefined && spot.latitude !== undefined
  );

  const handleMarkerClick = (spot) => {
    setSelectedSpot(spot);
  };

  return (
    <MapContainer>
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX}
        initialViewState={initialViewState}
        mapStyle="mapbox://styles/mapbox/dark-v10"
        attributionControl={false}
        style={{ width: "100%", height: "100%" }}
      >
        {validSpots.map((spot) => {
          return (
            <Marker
              key={spot._id}
              longitude={spot.longitude}
              latitude={spot.latitude}
              anchor="bottom"
            >
              <StyledMarker
                onClick={(e) => {
                  e.preventDefault();
                  handleMarkerClick(spot);
                }}
              >
                <MdLocationPin fontSize={30} />
              </StyledMarker>
            </Marker>
          );
        })}
        {selectedSpot ? (
          <StyledPopup
            key={selectedSpot.title}
            latitude={selectedSpot.latitude}
            longitude={selectedSpot.longitude}
            anchor="bottom"
            closeOnClick={false}
            onClose={() => setSelectedSpot(null)}
          >
            <div className="popup-wrapper">
              <img
                src={selectedSpot.image}
                alt={selectedSpot.title}
                style={{
                  width: "100%",
                  height: "auto",
                  maxWidth: 110,
                  maxHeight: 110,
                }}
              />
              <h2>{selectedSpot.title}</h2>
            </div>
          </StyledPopup>
        ) : null}
      </Map>
    </MapContainer>
  );
}
