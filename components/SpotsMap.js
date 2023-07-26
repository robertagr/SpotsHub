import React from "react";
import styled from "styled-components";
import Map, { Marker, Popup } from "react-map-gl";
import { useSpotStore } from "../public/stores/spotStore";
import { useState } from "react";

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
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleMarkerClick(spot);
                }}
              >
                <img src="/pin.png" alt="Pin" width={30} height={30} />
              </button>
            </Marker>
          );
        })}
        {selectedSpot ? (
          <Popup
            key={selectedSpot.title}
            latitude={selectedSpot.latitude}
            longitude={selectedSpot.longitude}
            anchor="bottom"
            closeOnClick={false}
            onClose={() => setSelectedSpot(null)}
          >
            <h2>{selectedSpot.title}</h2>
          </Popup>
        ) : null}
      </Map>
    </MapContainer>
  );
}
