import React, {useEffect, useState} from "react";
import api from "../utils/api.ts";


interface ArtistData {
    id: number;
    name: string;
}
interface AlbumData {
    id: number;
    name: string;
    image: string;
}

interface MusicProps{
    key: number;
    file: string;
    name: string;
    artists: ArtistData[];
    album: AlbumData;
}

export const Music: React.FC<MusicProps> = ({file, name, artists,album}) => {
    const [imageData, setImageData] = useState<string>("")

    useEffect(() => {
        async function getImage(image: string) {
            try {
                const res = await api.get<Blob>("user/file/" + image,{
                    responseType: "blob",
                });
                if(res.data){
                    const blob = URL.createObjectURL(res.data);
                    setImageData(blob);
                } else {
                    console.log("Unable to load cocktail image");
                }
            } catch(error) {
                console.error("Error fetching cocktail image", error);
            }
        }
        void getImage(album.image);
    }, []);
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
            <div>
                <div key={album.id}>
                    <img src={imageData} alt="Music Clip"/>
                    <span>{album.name}</span>
                </div>
            </div>
        </div>
    );
}