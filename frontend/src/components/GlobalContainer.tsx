import styled from 'styled-components';

export default function GlobalContainer({ children }) {
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