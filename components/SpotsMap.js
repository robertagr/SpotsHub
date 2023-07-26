import React from "react";
import styled from "styled-components";
import Map, { Marker } from "react-map-gl";
import { useSpotStore } from "../public/stores/spotStore";

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
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

  const validSpots = spots.filter(
    (spot) => spot.longitude !== undefined && spot.latitude !== undefined
  );
  console.log(validSpots);

  return (
    <MapContainer>
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX}
        initialViewState={initialViewState}
        mapStyle="mapbox://styles/mapbox/dark-v10"
        attributionControl={false}
      >
        {validSpots.map((spot) => {
          return (
            <Marker
              key={spot._id}
              longitude={spot.longitude}
              latitude={spot.latitude}
              // anchor="bottom"
            >
              {/* <div>📍</div> */}
              <img src="/pin.png" alt="Pin" />
            </Marker>
          );
        })}
      </Map>
    </MapContainer>
  );
}
