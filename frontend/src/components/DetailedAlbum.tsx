import React, { useEffect, useState } from "react";
import getImage from "../utils/Imageutils.tsx";
import styled from "styled-components";

interface AlbumProps {
    id: number;
    key?: number;
    image: string;
    name: string;
}

const DetailedAlbum: React.FC<AlbumProps> = ({ name, id, image }) => {
    const [imageData, setImageData] = useState<string>("");

    useEffect(() => {
        void getImage(image, setImageData);
    }, [image]);

    return (
        <AlbumDiv key={id}>
            <AlbumImage src={imageData} alt={`${name} album cover`} />
            <AlbumName>{name}</AlbumName>
        </AlbumDiv>
    );
};

export default DetailedAlbum;

// Styled Components
const AlbumDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
`;

const AlbumImage = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 8px;
    object-fit: cover;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const AlbumName = styled.span`
    color: #ffffff;
    margin-top: 10px;
    font-size: 16px;
    text-align: center;
    font-weight: bold;
`;
