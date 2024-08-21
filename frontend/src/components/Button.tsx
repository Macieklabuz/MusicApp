import React from "react"
import styled from "styled-components";

interface ButtonProps {
    onClick:()=> void
    label:string
};

export const Button :React.FC<ButtonProps> =({ onClick, label}) => {
    return(
        <StyledButton onClick={onClick}>{label}</StyledButton>
    );
}

const StyledButton = styled.button`
    width: 20vw;
    height: 20vh;
    background-color: green;
    border-radius: 20px;
    align-self: center;
    
    font-family: Inter, serif;
    font-size: 50px;
`