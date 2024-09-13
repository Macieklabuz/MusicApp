import React, { useEffect, useState } from "react";
import api from "../utils/api.ts";
import styled from "styled-components";

interface MusicProps {
    key?: number;
    file: string;
    name: string;
    likes: number;
}

export const MusicForAlbum: React.FC<MusicProps> = ({ file, name, likes }) => {
    const [audioData, setAudioData] = useState<string>("");

    useEffect(() => {


        // Pobieranie pliku audio
        async function getAudio(file: string) {
            try {
                const res = await api.get<Blob>(`/user/audio/file`, {
                    params:{fileName:file},
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
        <MusicContainer>
            <MusicName>{name}</MusicName>
            {likes}
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
const MusicName = styled.div`
    font-size: 32px;
    margin-bottom: 10px;
`