import MainContent from "../components/MainContent.tsx";
import api from "../utils/api.ts";
import {useEffect, useState} from "react";
import {Music} from "../components/Music.tsx"
import {Column, Columns} from "../styled-components/Common.tsx";


function Home() {

    interface ArtistData {
        id: number;
        name: string;
    }

    interface MusicProps {
        id: number;
        file: string;
        name: string;
        likes: number;
        artists: ArtistData[];
        album: AlbumData | null;
        onClick: any;
    }


    const [music, setMusic] = useState<MusicProps[]>([]);
    const [musicHistory, setMusicHistory] = useState<MusicProps[]>([]);
    const [error, setError] = useState<string | null> (null)

    useEffect(() => {

        async function getMusic() {


        try {
            const res = await api.get('user/music')
            if (res.data) {
                setMusic(res.data)
            } else {
                console.error("Music Not Found!")
            }
        } catch (err) {
            setError("Failed to fetch data")
            console.error(err)
        }
    }

        async function getMusicHistory() {

            try {
                const res = await api.get('user/history')
                if (res.data) {
                    setMusicHistory(res.data)
                } else {
                    console.error("Music Not Found!")
                }
            } catch (err) {
                setError("Failed to fetch data")
                console.error(err)
            }
        }
        void getMusicHistory()
        void getMusic()

    },[]);
    return (
        <MainContent>
            <h1>HOME</h1>
            <Columns>
                <Column>
                    {error}
                    {Array.isArray(musicHistory) && musicHistory.map((music) => (
                        <Music key={music.id} {...music}/>
                    ))}
                </Column>
                <Column>
                    {Array.isArray(music) && music.map((music) => (
                        <Music key={music.id} {...music}/>
                    ))}
                </Column>
            </Columns>
        </MainContent>
    );


}

export default Home;