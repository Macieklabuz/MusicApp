import React from "react";
import styled from "styled-components";

interface SearchBarProps {
    placeholder?: string;
    onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({placeholder = "Search...", onSearch}) => {

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
    }
    return (
        <StyledInput onChange={handleInputChange} placeholder = {placeholder}/>
    )
}

const StyledInput = styled.input`
  padding: 8px;
  font-size: 16px;
  width: 100%;
  margin-right: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

