import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainContent from "../components/MainContent";
import { Column, Columns } from "../styled-components/Common.tsx";
import { SearchBar } from "../components/SearchBar.tsx";
import api from "../utils/api.ts";
import { Music } from "../components/Music.tsx";
import { DetailedMusic } from "../components/DetailedMusic.tsx";
import EditMusic from "../components/EditMusic.tsx";
import styled from "styled-components";

function MusicPage() {
    interface MusicProps {
        id: number;
        name: string;
        file: string;
        description: string;
        likes: number;
        genres: GenreProps[];
        instruments: InstrumentProps[];
        artists: ArtistsProps[];
        album: AlbumProps;
        handleLike: () => void;
    }

    interface GenreProps {
        id: number;
        name: string;
    }

    interface InstrumentProps {
        id: number;
        name: string;
        image: string;
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
    const [filteredMusic, setFilteredMusic] = useState<MusicProps[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [clickedMusic, setClickedMusic] = useState<MusicProps | null>();
    const [editMode, setEditMode] = useState<boolean>(false);
    const [likedMusic, setLikedMusic] = useState<number[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");

    const navigate = useNavigate();

    function filterMusic(inputValue: string) {
        if (Array.isArray(music)) {
            const filtered = music.filter((music) =>
                music.name.toLowerCase().includes(inputValue.toLowerCase()) ||
                music.genres.some((genre) =>
                    genre.name.toLowerCase().includes(inputValue.toLowerCase())
                ) ||
                music.album.name.toLowerCase().includes(inputValue.toLowerCase())
            );
            setFilteredMusic(filtered);
            setSearchValue(inputValue);
        }
    }

    async function handleLike(musicId: number) {
        try {
            const isLiked = likedMusic.some(id => id === musicId);
            const url = isLiked ? "user/unlike" : "user/like";
            await api.post(url, null, {
                params: { musicId }
            });
            setLikedMusic(prevLikedIds =>
                isLiked
                    ? prevLikedIds.filter(likedId => likedId !== musicId)
                    : [...prevLikedIds, musicId]
            );
            setClickedMusic(prevMusic =>
                prevMusic
                    ? { ...prevMusic, likes: isLiked ? prevMusic.likes - 1 : prevMusic.likes + 1 }
                    : null
            );

            setMusic(prevMusic =>
                prevMusic.map(music =>
                    music.id === musicId
                        ? { ...music, likes: isLiked ? music.likes - 1 : music.likes + 1 }
                        : music
                )
            );

        } catch (error) {
            setError("Failed to fetch data");
            console.error(error);
        }
    }

    useEffect(() => {
        filterMusic(searchValue);
    }, [music]);

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
                    setFilteredMusic(res.data)
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
    }, []);

    return (
        <MainContentStyled>
            <ButtonStyled onClick={() => navigate('/addmusic')}>Add Music</ButtonStyled>
            <Columns>
                <ColumnStyled>
                    <SearchBar onSearch={filterMusic} />
                    {error && <ErrorMsg>{error}</ErrorMsg>}
                    {Array.isArray(filteredMusic) && filteredMusic.map(filteredMusicCurrent => (
                        <Music key={filteredMusicCurrent.id} onClick={() => setClickedMusic(filteredMusicCurrent)} {...filteredMusicCurrent} />
                    ))}
                </ColumnStyled>
                <ColumnStyled>
                    {clickedMusic && <DetailedMusic {...clickedMusic} handleEditMode={() => setEditMode(true)} handleLike={() => handleLike(clickedMusic.id)} />}
                </ColumnStyled>
            </Columns>
            {(clickedMusic && editMode) && (
                <EditMusic
                    handleEditMode={() => setEditMode(false)}
                    oldId={clickedMusic.id}
                    oldName={clickedMusic.name}
                    oldFile={clickedMusic.file}
                    oldDescription={clickedMusic.description}
                    oldGenres={clickedMusic.genres}
                    oldInstruments={clickedMusic.instruments}
                />
            )}
        </MainContentStyled>
    )
}

export default MusicPage;

// Styled Components
const MainContentStyled = styled.div`
    background-color: #121212;
    color: white;
    padding: 20px;
    min-height: 100vh;
`;

const ColumnStyled = styled(Column)`
    background-color: #181818;
    padding: 20px;
    border-radius: 8px;
    margin: 10px 0;
    margin-top: 40px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

const ErrorMsg = styled.div`
    color: #ff4d4d;
    margin-bottom: 10px;
    text-align: center;
`;

const ButtonStyled = styled.button`
    background-color: #1db954;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    margin-bottom: 20px;
    margin-top: 60px; /* Adjust this value to position the button below the navbar */
    transition: background-color 0.3s;

    &:hover {
        background-color: #1ed760;
    }
`;
