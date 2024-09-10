import MainContent from "../components/MainContent";
import {Column, Columns} from "../styled-components/Common.tsx";
import {useEffect, useState} from "react";
import {SearchBar} from "../components/SearchBar.tsx";
import api from "../utils/api.ts";
import {Music} from "../components/Music.tsx";
import {DetailedMusic} from "../components/DetailedMusic.tsx";
import EditMusic from "../components/EditMusic.tsx";

function MusicPage(){

    interface MusicProps{
        id: number;
        name: string;
        file: string;
        description: string;
        genres: GenreProps[];
        instruments: InstrumentProps[];
        artists: ArtistsProps[];
        album: AlbumProps;
    }
    interface GenreProps{
        id: number;
        name: string;
    }
    interface InstrumentProps{
        id: number;
        name: string;
        image: string;
    }
    interface ArtistsProps {
        id: number;
        name: string;
    }
    interface AlbumProps{
        id: number;
        name: string;
        image: string;
    }
    const [music, setMusic] = useState<MusicProps[]>([]);
    const [filteredMusic, setFilteredMusic] = useState<MusicProps[]>([]);
    const [error, setError] = useState<string | null> (null)
    const [clickedMusic, setClickedMusic] = useState<MusicProps>();
    function filterMusic(inputValue: string){
        if (Array.isArray(music)){
            const filtered = music.filter((music) =>
                music.name.toLowerCase().includes(inputValue.toLowerCase()) ||
                music.genres.some((genre) =>
                    genre.name.toLowerCase().includes(inputValue.toLowerCase())

                )
                ||
                        music.album.name.toLowerCase().includes(inputValue.toLowerCase())
            );
            setFilteredMusic(filtered);
        }
    }

    useEffect(() => {
        async function getMusic() {
            try {
                const res = await api.get("user/music");
                if (res.data) {
                    setMusic(res.data)
                    setFilteredMusic(res.data)
                } else {
                    setError("Music Not Found!")
                }

            } catch (error) {
                setError("Failed to fetch data");
                console.error(error);
            }
        }
        void getMusic();
    },[]);

    return (
        <MainContent>
            <Columns>
                <Column>
                    <SearchBar onSearch={filterMusic}/>
                    {error}
                    {Array.isArray(filteredMusic) && filteredMusic.map(filteredMusicCurrent => (
                        <Music key={filteredMusicCurrent.id} onClick = {() => setClickedMusic(filteredMusicCurrent)} {...filteredMusicCurrent} />
                    ))}
                </Column>
                <Column>
                    {clickedMusic && <DetailedMusic {...clickedMusic}/>}
                </Column>
            </Columns>
            {clickedMusic && <EditMusic oldId={clickedMusic.id} oldName = {clickedMusic.name} oldFile = {clickedMusic.file} oldDescription={clickedMusic.description} oldGenres={clickedMusic.genres} oldInstruments={clickedMusic.instruments} />}
        </MainContent>
    )
}

export default MusicPage
