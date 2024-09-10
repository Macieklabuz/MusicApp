import React, { useEffect, useState } from "react";
import styled from "styled-components";
import getImage from "../utils/Imageutils.tsx";
import {AiFillCloseCircle} from "react-icons/ai";

interface ArtistData {
    id: number;
    name: string;
}

interface AlbumData {
    id: number;
    name: string;
    image: string;
}

interface MusicProps {
    key?: number;
    description: string;
    name: string;
    likes: number;
    artists: ArtistData[];
    album: AlbumData | null;
    instruments: InstrumentProps[];
    genres: GenreProps[];
    handleLike: () => void;
    handleEditMode: () => void;
}
interface InstrumentProps{
    id: number;
    name: string;
}
interface GenreProps{
    id: number;
    name: string;
}

export const DetailedMusic: React.FC<MusicProps> = ({ name, artists, album, description, instruments, genres, likes, handleLike, handleEditMode }) => {
    const [imageData, setImageData] = useState<string>("");

    useEffect(() => {
        if(album) {
            getImage(album.image, setImageData);
        }
    }, []);

    return (
        <MusicContainer>
            <ExitIcon onClick = {handleEditMode} />
            <MusicName>{name}</MusicName>
            <div>{description}</div>
            <ArtistDiv>
                {artists.map((artist) => (
                    <div key={artist.id}>
                        <span>{artist.name}</span>
                    </div>
                ))}
            </ArtistDiv>
            <div>
                {album && <AlbumDiv key={album.id}>
                    <span>{album.name}</span>
                    <Image src={imageData}  />
                </AlbumDiv>}
            </div>
            <ArtistDiv>
                {instruments.map((instrument) => (
                    <div key={instrument.id}>
                        <span>{instrument.name}</span>
                    </div>
                ))}
            </ArtistDiv>
            <ArtistDiv>
                {genres.map((genre) => (
                    <div key={genre.id}>
                        <span>{genre.name}</span>
                    </div>
                ))}
            </ArtistDiv>
            <div onClick={handleLike}>
                {likes}
            </div>
        </MusicContainer>
    );
};

const Image = styled.img`
    object-fit: cover;
    width: 100px;
    border-radius: 10px;
`;

const MusicContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    gap: 10px;

    background-color: lightgray;
    padding: 10px;
`

const ArtistDiv = styled.div`
    justify-items: center;
    background-color: gray;
    border-radius: 10px;

    margin: 10px;
    padding: 10px;
`

const AlbumDiv = styled.div`
    background-color: gray;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const MusicName = styled.div`
    font-size: 32px;
    margin-bottom: 10px;
`
const ExitIcon = styled(AiFillCloseCircle)`
    position: absolute;
    top: 10px;
    right: 10px;
`;