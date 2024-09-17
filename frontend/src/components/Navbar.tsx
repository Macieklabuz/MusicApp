import { useState } from "react";
import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';  // Importing an icon for the hamburger menu

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <NavContainer>
            <Nav>
                <NavTitle href="/">MusicApp</NavTitle>
                <MenuIcon onClick={() => setMenuOpen(!menuOpen)}>
                    <FaBars size={20} color="white" />
                </MenuIcon>
                <NavList className={menuOpen ? "open" : ""}>
                    <NavListItem>
                        <NavLink href="/music">Music</NavLink>
                    </NavListItem>
                    <NavListItem>
                        <NavLink href="/artists">Artists</NavLink>
                    </NavListItem>
                    <NavListItem>
                        <NavLink href="/albums">Albums</NavLink>
                    </NavListItem>
                    <NavListItem>
                        <NavLink href="/genres">Genres</NavLink>
                    </NavListItem>
                    <NavListItem>
                        <NavLink href="/instruments">Instruments</NavLink>
                    </NavListItem>
                </NavList>
            </Nav>
        </NavContainer>
    );
};

// Styled Components

const NavContainer = styled.div`
    background-color: #121212; /* Spotify's dark theme */
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000; /* Ensure navbar stays on top */
    border-bottom: 1px solid #282828; /* Spotify-like subtle border */
`;

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    flex-direction: column;
    width: 90%;
    margin: 0 auto;
    padding: 0.75rem 0;

    @media (min-width: 768px) {
        flex-direction: row;
    }
`;

const NavTitle = styled.a`
    font-size: 1.75rem;
    font-weight: bold;
    text-decoration: none;
    color: white;
    letter-spacing: 1px;
    transition: color 0.3s;

    &:hover {
        color: #1DB954; /* Spotify's signature green */
    }
`;

const NavList = styled.ul`
    display: ${props => (props.className === "open" ? "flex" : "none")};
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: 1rem;

    @media (min-width: 768px) {
        display: flex;
        flex-direction: row;
        width: auto;
        margin-bottom: 0;
    }
`;

const NavListItem = styled.li`
    list-style: none;
    width: 100%;
    text-align: center;

    @media (min-width: 768px) {
        width: auto;
        text-align: left;
    }
`;

const NavLink = styled.a`
    display: block;
    text-decoration: none;
    color: white;
    padding: 0.75rem 1.5rem;
    margin: 0.5rem 0;
    border-radius: 20px;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
        background-color: #333333; /* Slight hover effect */
        color: #1DB954; /* Spotify's green for hover */
    }

    @media (min-width: 768px) {
        margin: 0 0.5rem;
        padding: 0.5rem 1rem;
    }
`;

const MenuIcon = styled.div`
    display: flex;
    cursor: pointer;

    @media (min-width: 768px) {
        display: none; /* Hide the menu icon on larger screens */
    }
`;
