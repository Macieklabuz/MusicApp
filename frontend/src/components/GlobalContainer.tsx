import styled from 'styled-components';
import {ReactNode} from "react";

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
    background-color: lightgray;
`