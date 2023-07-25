import * as React from "react";
import Map from "react-map-gl";
import styled from "styled-components";
import MapGL from "react-map-gl";

const MapContainer = styled.div`
  position: relative;
  width: 600px;
  height: 400px;
  border-radius: 20px;
  margin: 0 auto;
`;

export default function SpotsMap() {
  return (
    <MapContainer>
      <MapGL
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX}
        width={600}
        height={400}
        longitude={13.381777}
        latitude={52.531677}
        zoom={10}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        attributionControl={false}
      />
    </MapContainer>
  );
}
