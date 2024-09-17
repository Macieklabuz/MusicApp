import {useEffect, useState} from "react";
import api from "../utils/api.ts";
import MainContent from "../components/MainContent.tsx";
import {Column, Columns} from "../styled-components/Common.tsx";
import Album from "../components/Album.tsx";
import {MusicForAlbum} from "../components/MusicForAlbum.tsx";

function AlbumPage() {

    interface MusicProps {
        id: number;
        name: string;
        file: string;
        likes: number;
    }

    interface ArtistsProps {
        id: number;
        name: string;
    }

    interface AlbumProps {
        id: number;
        name: string;
        image: string;
        artists: ArtistsProps[];
        music: MusicProps[];
    }

    const [album, setAlbum] = useState<AlbumProps[]>([]);
    const [error, setError] = useState<string | null> (null)
    const [clickedMusic, setClickedMusic] = useState<MusicProps[] | null>();

    useEffect(() => {
        async function getAlbum() {
            try {
                const res = await api.get("user/album/artist");
                if (res.data) {
                    setAlbum(res.data)
                    console.log(res.data)
                } else {
                    setError("Music Not Found!")
                }

            } catch (error) {
                setError("Failed to fetch data");
                console.error(error);
            }
        }
        void getAlbum();
    },[]);

    return (
        <MainContent>
            <Columns>
                <Column>
                    {error}
                    {Array.isArray(album) && album.map(albumCurrent => (
                        <Album key={albumCurrent.id} onClick={()=>setClickedMusic(albumCurrent.music)} {...albumCurrent} />
                    ))}
                </Column>
                <Column>
                    {clickedMusic && clickedMusic.map(musicCurrent =>(
                        <MusicForAlbum {...musicCurrent}/>
                    ))}
                </Column>
            </Columns>
        </MainContent>
    )
}
export default AlbumPage;
