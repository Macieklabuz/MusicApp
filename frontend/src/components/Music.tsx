import React, { useEffect, useState } from "react";
import api from "../utils/api.ts";
import styled from "styled-components";

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
    album: AlbumData;

    onClick: any;
}

export const Music: React.FC<MusicProps> = ({ file, name, artists, album, onClick }) => {
    const [imageData, setImageData] = useState<string>("");
    const [audioData, setAudioData] = useState<string>("");

    useEffect(() => {
        // Pobieranie obrazu albumu
        async function getImage(image: string) {
            try {
                const res = await api.get<Blob>(`/user/file/${image}`, {
                    responseType: "blob",
                });
                if (res.data) {
                    const blob = URL.createObjectURL(res.data);
                    setImageData(blob);
                } else {
                    console.log("Unable to load album image");
                }
            } catch (error) {
                console.error("Error fetching album image", error);
            }
        }

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

        getImage(album.image);
        getAudio(file);
    }, [album.image, file]);

    return (
        <div onClick={onClick}>
            <div>{name}</div>
            <div>
                {artists.map((artist) => (
                    <div key={artist.id}>
                        <span>{artist.name}</span>
                    </div>
                ))}
            </div>
            <div>
                <div key={album.id}>
                    <span>{album.name}</span>
                    <Image src={imageData}  />
                </div>
            </div>
            {audioData && (
                <audio controls>
                    <source src={audioData} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            )}
        </div>
    );
};

const Image = styled.img`
    object-fit: cover;
    width: 100px;
    border-radius: 10px;
`;
