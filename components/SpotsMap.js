import React from "react";
import styled from "styled-components";
import Map, { Marker, Popup } from "react-map-gl";
import { useSpotStore } from "../public/stores/spotStore";
import { useState, useEffect } from "react";
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
  color: #F2500A;
  &:hover {
    color: #FCBF8D;
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
    background-color: #FF9875;
    &:hover {
      background-color: #FCBF8D;
    }
  }
`;


const initialViewState = {
  longitude: 13.381777,
  latitude: 52.531677,
  zoom: 10,
};


export default function SpotsMap() {
  const { spots, searchQuery, setSearchQuery, searchedSpots } = useSpotStore();
  const [selectedSpot, setSelectedSpot] = useState(null);


  const validSpots = spots.filter(
    (spot) => spot.longitude !== undefined && spot.latitude !== undefined
  );

  console.log('VALID SP', validSpots);

  // const filteredSpots = spots.filter((spot) => {
  //   const tags = spot.tags || [];
  //   return (
  //     tags.some((tag) =>
  //       tag.toLowerCase().includes(searchQuery.toLowerCase())
  //     ) || spot.title.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  // });

  useEffect(() => {
    if (searchedSpots.length === 1) {
      setSelectedSpot(searchedSpots[0]);
    }
  }, [searchedSpots]);


  const handleMarkerClick = (spot) => {
    setSelectedSpot(spot);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCancelSearch = () => {
    setSearchQuery(""); // Clear the search query
    setSelectedSpot(null); // Clear the selected spot to close the popup
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
        {selectedSpot ?
                  (
          <StyledPopup
            key={selectedSpot.title}
            latitude={selectedSpot.latitude}
            longitude={selectedSpot.longitude}
            anchor="bottom"
            closeOnClick={false}
            onClose={() => setSelectedSpot(null)}
          >
            <div className="popup-wrapper">
              <Image
                src={selectedSpot.image}
                alt={selectedSpot.title}
                width={130}
                height={130}
                style={{ maxWidth: 110, maxHeight: 110 }}
              />
              <h3>{selectedSpot.title}</h3>
                    {/* <Link href={`/spots/${selectedSpot.title}`}>
              <h2>{selectedSpot.image}</h2>
              <p>{selectedSpot.description}</p>

              </Link> */}

            </div>
          </StyledPopup>
        ) : null}
      </Map>
    </MapContainer>
  );
}
