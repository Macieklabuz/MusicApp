import React from "react";
import styled from "styled-components";

interface InstrumentProps {
    id: number;
    key?: number;
    name: string;
}

const Instrument: React.FC<InstrumentProps> = ({name, id  }) =>{
    return(
        <InstrumentDiv key={id}>
            <span>{name}</span>
        </InstrumentDiv>
    )
}
export default Instrument

const InstrumentDiv = styled.div`
    background-color: gray;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`