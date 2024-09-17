import React, { useEffect, useState } from "react";
import api from "../utils/api.ts";
import styled from "styled-components";
import { FaHeart } from "react-icons/fa"; // Import heart icon for likes

interface MusicProps {
    key?: number;
    file: string;
    name: string;
    likes: number;
}

export const MusicForAlbum: React.FC<MusicProps> = ({ file, name, likes }) => {
    const [audioData, setAudioData] = useState<string>("");

    useEffect(() => {
        // Fetch the audio file
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

        void getAudio(file);
    }, [file]);

    return (
        <MusicRow>
            <TrackName>{name}</TrackName>
            {audioData && (
                <AudioPlayer controls>
                    <source src={audioData} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </AudioPlayer>
            )}
            <Likes>
                <FaHeart color="#1DB954" /> {likes}
            </Likes>
        </MusicRow>
    );
};

// Styled Components

const MusicRow = styled.div`
    background-color: #282828; /* Dark background similar to Spotify */
    padding: 10px 20px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
    margin-bottom: 10px;

    &:hover {
        background-color: #1c1c1c; /* Darken on hover */
    }
`;

const TrackName = styled.div`
    font-size: 16px;
    font-weight: 600;
    color: white;
    flex: 1; /* Take up available space */
`;

const AudioPlayer = styled.audio`
    flex: 2; /* Takes up more space for the player */
    margin: 0 20px; /* Adds space between the name and the player */

    &::-webkit-media-controls-panel {
        background-color: #181818; /* Darker color for controls */
    }
    &::-webkit-media-controls-play-button,
    &::-webkit-media-controls-volume-slider {
        color: white; /* White color for buttons */
    }
`;

const Likes = styled.div`
    font-size: 14px;
    color: #b3b3b3; /* Light gray text for likes */
    display: flex;
    align-items: center;
    gap: 5px;
`;
