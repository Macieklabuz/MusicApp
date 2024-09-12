import {useEffect, useState} from "react";
import api from "../utils/api.ts";
import MainContent from "../components/MainContent.tsx";
import {Column, Columns} from "../styled-components/Common.tsx";
import {Music} from "../components/Music.tsx";
import DetailedAlbum from "../components/DetailedAlbum.tsx";
import Album from "../components/Album.tsx";

function AlbumPage() {

    interface MusicProps {
        id: number;
        name: string;
        file: string;
        likes: number;
        genres: GenreProps[];
        artists: ArtistsProps[];
        album: AlbumProps;
        handleLike: () => void;
    }

    interface GenreProps {
        id: number;
        name: string;
    }

    interface ArtistsProps {
        id: number;
        name: string;
    }

    interface AlbumProps {
        id: number;
        name: string;
        image: string;
    }

    const [music, setMusic] = useState<MusicProps[]>([]);
    const [error, setError] = useState<string | null> (null)
    const [clickedMusic, setClickedMusic] = useState<MusicProps | null>();
    const [editMode, setEditMode] = useState<boolean>(false);
    const [likedMusic, setLikedMusic] = useState<number[]>([])
    const [searchValue, setSearchValue] = useState<string>("");

    async function handleLike(musicId: number) {
        try {
            const isLiked = likedMusic.some(id => (id === musicId));
            const url = isLiked ? "user/unlike" : "user/like";
            await api.post(url, null, {
                params: {musicId}
            });
            setLikedMusic(prevLikedIds =>
                isLiked
                    ? prevLikedIds.filter(likedId => likedId !== musicId)
                    : [...prevLikedIds, musicId]
            );
            setClickedMusic(prevMusic =>
                prevMusic
                    ? {...prevMusic, likes: isLiked ? prevMusic.likes - 1 : prevMusic.likes + 1}
                    : null
            );

            setMusic(prevMusic =>
                prevMusic.map(music =>
                    music.id === musicId
                        ? { ...music, likes: isLiked? music.likes - 1 : music.likes + 1}
                        : music
                )
            );

        } catch (error) {
            setError("Failed to fetch data");
            console.error(error);
        }
    }
    useEffect(() => {
        async function getLikedMusic() {
            try {
                const res = await api.get("user/likedIds");
                if (res.data) {
                    setLikedMusic(res.data)
                } else {
                    setError("Likes Not Found!")
                }

            } catch (error) {
                setError("Failed to fetch data");
                console.error(error);
            }
        }


        async function getMusic() {
            try {
                const res = await api.get("user/music");
                if (res.data) {
                    setMusic(res.data)
                } else {
                    setError("Music Not Found!")
                }

            } catch (error) {
                setError("Failed to fetch data");
                console.error(error);
            }
        }
        void getLikedMusic();
        void getMusic();
    },[]);

    return (
        <MainContent>
            <Columns>
                <Column>
                    {error}
                    {Array.isArray(music) && music.map(musicCurrent => (
                        <Album key={musicCurrent.album.id} {...musicCurrent.album} />
                    ))}
                </Column>
                <Column>
                    {clickedMusic && <DetailedAlbum {...clickedMusic.album}/>}
                </Column>
            </Columns>
        </MainContent>
    )
}
export default AlbumPage;
