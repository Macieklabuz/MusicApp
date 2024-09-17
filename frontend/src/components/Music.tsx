import React, { useEffect, useState } from "react";
import api from "../utils/api.ts";
import styled from "styled-components";
import DetailedAlbum from "./DetailedAlbum.tsx";
import { FaHeart } from "react-icons/fa";

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
    key: number;
    file: string;
    name: string;
    likes: number;
    artists: ArtistData[];
    album: AlbumData | null;
    onClick: any;
}

export const Music: React.FC<MusicProps> = ({ file, name, artists, album, onClick, likes }) => {
    const [audioData, setAudioData] = useState<string>("");

    useEffect(() => {
        async function getAudio(file: string) {
            try {
                const res = await api.get<Blob>(`/user/audio/file`, {
                    params: { fileName: file },
                    responseType: "blob",
                });
                if (res.data) {
                    const blob = URL.createObjectURL(res.data);
                    setAudioData(blob);
                } else {
                    console.log("Unable to load audio file");
                }
            } catch (error) {
                console.error("Error fetching audio file", error);
            }
        }

        getAudio(file);
    }, [file]);

    return (
        <MusicContainer onClick={onClick}>
            <MusicHeader>
                {album && <DetailedAlbum id={album.id} name={album.name} image={album.image} />}
                <MusicInfo>
                    <MusicName>{name}</MusicName>
                    <ArtistDiv>
                        {artists.map((artist) => (
                            <ArtistName key={artist.id}>{artist.name}</ArtistName>
                        ))}
                    </ArtistDiv>
                </MusicInfo>
            </MusicHeader>

            <MusicControls>
                {audioData && (
                    <AudioPlayer controls>
                        <source src={audioData} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </AudioPlayer>
                )}
                <Likes>
                    <FaHeart color="#1DB954" /> {likes}
                </Likes>
            </MusicControls>
        </MusicContainer>
    );
};

// Styled Components

const MusicContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #181818;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    transition: background-color 0.3s;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    &:hover {
        background-color: #282828;
    }
`;

const MusicHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;

const MusicInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const MusicName = styled.h2`
    font-size: 20px;
    color: white;
    margin-bottom: 5px;
`;

const ArtistDiv = styled.div`
    display: flex;
    gap: 10px;
`;

const ArtistName = styled.span`
    font-size: 14px;
    color: #b3b3b3;
`;

const MusicControls = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
`;

const AudioPlayer = styled.audio`
    flex-grow: 1;
    margin-right: 20px;
    outline: none;

    &::-webkit-media-controls-panel {
        background-color: #1c1c1c;
    }

    &::-webkit-media-controls-play-button,
    &::-webkit-media-controls-volume-slider {
        color: white;
    }
`;

const Likes = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 14px;
    color: #b3b3b3;
    cursor: pointer;

    &:hover {
        color: #1DB954;
    }
`;
