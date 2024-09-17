import React, { useEffect, useState } from "react";
import styled from "styled-components";
import getImage from "../utils/Imageutils.tsx";
import { FaPen } from "react-icons/fa"; // Import ikony długopisu z FontAwesome

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

interface InstrumentProps {
    id: number;
    name: string;
}

interface GenreProps {
    id: number;
    name: string;
}

export const DetailedMusic: React.FC<MusicProps> = ({ name, artists, album, description, instruments, genres, likes, handleLike, handleEditMode }) => {
    const [imageData, setImageData] = useState<string>("");

    useEffect(() => {
        if (album) {
            getImage(album.image, setImageData);
        }
    }, [album]);

    return (
        <MusicContainer>
            <EditIcon onClick={handleEditMode} /> {/* Zmieniono ikonę */}
            <MusicName>{name}</MusicName>
            <Description>{description}</Description>
            <SectionTitle>Artists</SectionTitle>
            <ArtistDiv>
                {artists.map((artist) => (
                    <span key={artist.id}>{artist.name}</span>
                ))}
            </ArtistDiv>
            {album && (
                <>
                    <SectionTitle>Album</SectionTitle>
                    <AlbumDiv>
                        <AlbumName>{album.name}</AlbumName>
                        <AlbumImage src={imageData} />
                    </AlbumDiv>
                </>
            )}
            <SectionTitle>Instruments</SectionTitle>
            <ArtistDiv>
                {instruments.map((instrument) => (
                    <span key={instrument.id}>{instrument.name}</span>
                ))}
            </ArtistDiv>
            <SectionTitle>Genres</SectionTitle>
            <ArtistDiv>
                {genres.map((genre) => (
                    <span key={genre.id}>{genre.name}</span>
                ))}
            </ArtistDiv>
            <LikeSection onClick={handleLike}>
                <LikeIcon>❤</LikeIcon> {likes}
            </LikeSection>
        </MusicContainer>
    );
};

// Styled Components in Spotify Style

const MusicContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: #181818;
    padding: 20px;
    border-radius: 10px;
    gap: 20px;
    color: #fff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    width: 80%;  /* Adjusted width to be wider */
    max-width: 800px;  /* Set a max width */
    margin: 0 auto;  /* Center the container */
`;

const MusicName = styled.div`
    font-size: 28px;
    font-weight: bold;
    color: #fff;
`;

const Description = styled.div`
    font-size: 16px;
    color: #b3b3b3;
    line-height: 1.5;
`;

const SectionTitle = styled.h3`
    color: #1db954;
    font-size: 18px;
    margin-bottom: 10px;
`;

const ArtistDiv = styled.div`
    background-color: #282828;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    span {
        color: #fff;
        background-color: #333;
        padding: 5px 10px;
        border-radius: 50px;
    }
`;

const AlbumDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;

const AlbumImage = styled.img`
    object-fit: cover;
    width: 100px;
    height: 100px;
    border-radius: 10px;
`;

const AlbumName = styled.div`
    font-size: 18px;
    color: #fff;
`;

const LikeSection = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    font-size: 18px;
    color: #1db954;
    transition: color 0.3s;

    &:hover {
        color: #1ed760;
    }
`;

const LikeIcon = styled.span`
    font-size: 24px;
`;

const EditIcon = styled(FaPen)`  /* Nowa ikona długopisu */
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    color: #b3b3b3;
    cursor: pointer;

    &:hover {
        color: #fff;
    }
`;
