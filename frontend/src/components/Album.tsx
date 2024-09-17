import React, { useEffect, useState } from "react";
import getImage from "../utils/Imageutils.tsx";
import styled from "styled-components";

interface AlbumProps {
    id: number;
    key?: number;
    image: string;
    name: string;
    artists: ArtistsProps[];
    onClick?: () => void;
}

interface ArtistsProps {
    id: number;
    name: string;
}

const Album: React.FC<AlbumProps> = ({ name, id, image, artists, onClick }) => {
    const [imageData, setImageData] = useState<string>("");

    useEffect(() => {
        void getImage(image, setImageData);
    }, [image]);

    return (
        <AlbumCard key={id} onClick={onClick}>
            <AlbumImage src={imageData} alt="Album image" />
            <AlbumInfo>
                <AlbumName>{name}</AlbumName>
                <ArtistList>
                    {artists && artists.map((artist) => (
                        <ArtistName key={artist.id}>{artist.name}</ArtistName>
                    ))}
                </ArtistList>
            </AlbumInfo>
        </AlbumCard>
    );
};

export default Album;

// Styled Components for Spotify-like Design

const AlbumCard = styled.div`
    background-color: #181818; /* Dark background like Spotify */
    border-radius: 8px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    &:hover {
        transform: scale(1.05); /* Slight zoom on hover */
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Shadow effect */
    }
`;

const AlbumImage = styled.img`
    object-fit: cover;
    width: 150px;
    height: 150px;
    border-radius: 8px; /* Rounded corners */
    margin-bottom: 15px;
`;

const AlbumInfo = styled.div`
    text-align: center;
    color: white; /* Text color similar to Spotify's UI */
`;

const AlbumName = styled.span`
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 5px;
`;

const ArtistList = styled.div`
    font-size: 14px;
    color: #b3b3b3; /* Lighter gray for artist names */
`;

const ArtistName = styled.span`
    &:not(:last-child)::after {
        content: ", ";
    }
`;
