import styled from 'styled-components';
import { ReactNode } from "react";

interface MainContentProps {
    children: ReactNode;
}

export default function GlobalContainer({ children }: MainContentProps) {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    margin: 0;
    background-color: #121212; /* Spotify-like dark background */
    padding: 20px; /* Add padding for content spacing */
    overflow-y: auto; /* Ensure content is scrollable if it overflows */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start; /* Align children to the top */
    color: white; /* Spotify uses a white font on dark background */
`;
