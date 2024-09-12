import React, {useEffect, useState} from "react";
import getImage from "../utils/Imageutils.tsx";
import styled from "styled-components";

interface AlbumProps {
    id: number;
    key?: number;
    image: string;
    name: string;
}


const DetailedAlbum: React.FC<AlbumProps> = ({name, id, image }) =>{
    const [imageData, setImageData] = useState<string>("");
    useEffect(() => {
        void getImage(image, setImageData);
    },[])
    return(
        <AlbumDiv key={id}>
            <span>{name}</span>
            <Image src={imageData} alt="Album image"/>
        </AlbumDiv>
    )
}
export default DetailedAlbum

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