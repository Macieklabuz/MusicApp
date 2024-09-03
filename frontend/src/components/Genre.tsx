import React from "react";
import styled from "styled-components";

interface GenreProps {
    id: number;
    key?: number;
    name: string;
}

const Genre: React.FC<GenreProps> = ({name, id  }) =>{
    return(
        <GenreDiv key={id}>
            <span>{name}</span>
        </GenreDiv>
    )
}
export default Genre

const GenreDiv = styled.div`
    background-color: gray;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`