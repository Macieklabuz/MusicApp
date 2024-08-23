import { Navigate } from "react-router-dom";
import {Button} from "../components/Button.tsx";
import MainContent from "../components/MainContent.tsx";
import styled from "styled-components";
import api from "../utils/api.ts";
import {useEffect, useState} from "react";
import {Music} from "../components/Music.tsx"


function Home() {

    interface ArtistData {
        id: number;
        name: string;
    }

    interface MusicData{
        id: string;
        file: string;
        name: string;
        artists: ArtistData[];
    }
    const [music, setMusic] = useState<MusicData[]>([]);
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

    void getMusic()

    });
    return (
        <MainContent>
            <h1>HOME</h1>
            <Columns>
                <Column>
                    <Button onClick={()=>(<Navigate to="chuj"/>)} label={"meow"}/>
                    <Button onClick={()=>(<Navigate to="chuj"/>)} label={"meow"}/>

                </Column>
                <Column>
                    {error}
                    {Array.isArray(music) && music.map((music) => (
                        <Music key={music.id} {...music}/>
                    ))}
                </Column>
            </Columns>
        </MainContent>
    );


}

export default Home;

const Columns = styled.div`
    display: flex;
    flex-direction: row;
    gap: 50px;

`
const Column = styled.div`
    display: flex;
    flex-direction: column;

    align-items: center;
    gap: 50px;
    width: 30vw;

    background-color: rgba(0,0,0,0.2);
    padding: 50px;
    border-radius: 20px;
`