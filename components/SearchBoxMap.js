import React from "react";
import styled from "styled-components";

const SearchContainer = styled.div`
  position: relative;
  width: 300px;
  height: 40px;
  margin-top: 20px;

`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 16px;
  outline: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.8);
`;

const CancelButton = styled.button`
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  font-size: 16px;
  background: none;
  border: none;
  cursor: pointer;
`;

export default function SearchBoxMap({ value, onChange, placeholder, onCancel }) {
  return (
    <SearchContainer>
      <SearchInput
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {value && <CancelButton onClick={onCancel}>X</CancelButton>}
    </SearchContainer>
  );
}