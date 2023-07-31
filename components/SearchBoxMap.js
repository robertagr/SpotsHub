import React from "react";
import styled from "styled-components";

const SearchInput = styled.input`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 40px;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 16px;
  outline: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.8);
`;

export const SmallBox = styled.div`
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: white;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export default function SearchBoxMap({ value, onChange, placeholder }) {
  return (
    <SearchInput
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
