import React from "react";


interface ArtistData {
    id: number;
    name: string;
}

interface MusicProps{
    key: string;
    file: string;
    name: string;
    artists: ArtistData[];
}

export const Music: React.FC<MusicProps> = ({file, name, artists}) => {
    return (
        <div>
            <img src={file} alt="Music Clip"/>
            <div>{name}</div>
            <div>
                {artists.map((artist) => (
                    <div key={artist.id}>
                        <span>{artist.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}