import React from "react";
import styled from "styled-components";
import MapGL from "react-map-gl";

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
  return (
    <MapContainer>
      <MapGL
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX}
        width={600}
        height={400}
        initialViewState={initialViewState}
        mapStyle="mapbox://styles/mapbox/light-v11"
        attributionControl={false}
      />
    </MapContainer>
  );
}
