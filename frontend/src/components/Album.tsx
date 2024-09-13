import React, {useEffect, useState} from "react";
import getImage from "../utils/Imageutils.tsx";
import styled from "styled-components";

interface AlbumProps {
    id: number;
    key?: number;
    image: string;
    name: string;
    artists: ArtistsProps[];
    onClick?: ()=>void;
}

interface ArtistsProps {
    id: number;
    name: string;
}

const Album: React.FC<AlbumProps> = ({name, id, image, artists, onClick }) =>{
    const [imageData, setImageData] = useState<string>("");
    useEffect(() => {
       void getImage(image, setImageData);
    },[])
    return(
        <AlbumDiv key={id} onClick={onClick}>
            <span>{name}</span>
            <Image src={imageData} alt="Album image"/>
            {artists && artists.map(artist =><div>
                    {artist.name}
                </div>)}
        </AlbumDiv>
    )
}
export default Album

const AlbumDiv = styled.div`
    background-color: gray;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Image = styled.img`
    object-fit: cover;
    width: 100px;
    border-radius: 10px;
`;