import React from "react";
import styled from "styled-components";
import Map, { Marker, Popup, GeolocateControl } from "react-map-gl";
import { useSpotStore } from "../public/stores/spotStore";
import { useState, useEffect, useRef } from "react";
import { MdLocationPin } from "react-icons/md";
import SearchBoxMap from "./SearchBoxMap";
import Image from "next/image";
import Link from "next/link";

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
    color: white;
    background-color: #ff9875;
    &:hover {
      background-color: #fcbf8d;
    }
  }
`;

const PopUpTitle = styled.h3`
  color: #3f3f3f;
  font-size: inherit;
`;

const initialViewState = {
  longitude: 13.381777,
  latitude: 52.531677,
  zoom: 10,
};

export default function SpotsMap() {
  const { spots, searchQuery, setSearchQuery, searchedSpots } = useSpotStore();
  const [selectedSpots, setSelectedSpots] = useState([]);

  const validSpots = spots.filter(
    (spot) => spot.longitude !== undefined && spot.latitude !== undefined
  );

  useEffect(() => {
    if (searchedSpots.length >= 0) {
      setSelectedSpots(searchedSpots);
    }
  }, [searchedSpots]);

  const handleMarkerClick = (spot) => {
    setSelectedSpots([spot]);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCancelSearch = () => {
    setSearchQuery(""); // Clear the search query
    setSelectedSpots([]); // Clear the selected spot to close the popup
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
        <GeolocateControl
          position="bottom-right"
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          showUserLocation={true}
        />
        <SearchBoxMap
          value={searchQuery}
          onChange={handleSearchChange}
          onCancel={handleCancelSearch}
          placeholder="Search..."
        />
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
        {selectedSpots.map((selectedSpot) => {
          return (
            <StyledPopup
              key={selectedSpot.title}
              latitude={selectedSpot.latitude}
              longitude={selectedSpot.longitude}
              anchor="bottom"
              closeOnClick={false}
            >
              <div className="popup-wrapper">
                <Link href={`/drink/spots/bar/${selectedSpot.title}`}>
                  <Image
                    src={selectedSpot.image}
                    alt={selectedSpot.title}
                    width={130}
                    height={130}
                    style={{ maxWidth: 125, maxHeight: 115 }}
                  />
                </Link>
                <PopUpTitle>{selectedSpot.title}</PopUpTitle>
              </div>
            </StyledPopup>
          );
        })}
      </Map>
    </MapContainer>
  );
}
