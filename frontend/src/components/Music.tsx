import React, { useEffect, useState } from "react";
import api from "../utils/api.ts";
import styled from "styled-components";
import Album from "./Album.tsx";

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
    file: string; // nazwa pliku muzycznego na serwerze
    name: string;
    artists: ArtistData[];
    album: AlbumData | null;
    onClick: any;
}

export const Music: React.FC<MusicProps> = ({ file, name, artists, album, onClick }) => {
    const [audioData, setAudioData] = useState<string>("");

    useEffect(() => {


        // Pobieranie pliku audio
        async function getAudio(file: string) {
            try {
                const res = await api.get<Blob>(`/user/audio/file/${file}`, {
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

       void getAudio(file);
    }, []);

    return (
        <MusicContainer onClick={onClick}>
            <MusicName>{name}</MusicName>
            <ArtistDiv>
                {artists.map((artist) => (
                    <div key={artist.id}>
                        <span>{artist.name}</span>
                    </div>
                ))}
            </ArtistDiv>
            {album && <Album {...album}/>}
            {audioData && (
                <audio controls>
                    <source src={audioData} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            )}
        </MusicContainer>
    );
};

const MusicContainer = styled.div`
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

const MusicName = styled.div`
    font-size: 32px;
    margin-bottom: 10px;
`