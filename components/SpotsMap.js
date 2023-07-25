import React from "react";
import styled from "styled-components";
import MapGL, { Marker } from "react-map-gl";
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
  console.log(spots);

  return (
    <MapContainer>
      <MapGL
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX}
        width={600}
        height={400}
        initialViewState={initialViewState}
        mapStyle="mapbox://styles/mapbox/light-v11"
        attributionControl={false}
      >
        {spots.map((spot) => {
          <Marker
            key={spot._id} // Assuming each spot object has a unique _id property
            longitude={spot.longitude}
            latitude={spot.latitude}
          >
            {/* Customize the pin here, you can use an image or custom SVG */}
            <div>📍</div>
          </Marker>;
        })}
      </MapGL>
    </MapContainer>
  );
}
