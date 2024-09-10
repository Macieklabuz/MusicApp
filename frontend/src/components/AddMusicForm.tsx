import {FormEvent, useEffect, useState} from "react";
import api from "../utils/api";
import Select from "react-select";

interface InstrumentProps{
    id: number;
    name: string;
}

interface GenreProps{
    id: number;
    name: string;
}

export const AddMusicForm = () => {

    const [name, setName] = useState<string>('');
    const [fileName, setFileName] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [description, setDescription] = useState<string>('');
    const [instruments, setInstruments] = useState<InstrumentProps[]>([]);
    const [genres, setGenres] = useState<GenreProps[]>([]);
    const [selectedInstruments, setSelectedInstruments] = useState<InstrumentProps[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<GenreProps[]>([]);


    useEffect (() => {
        async function getInstruments() {
            try {
                const res = await api.get("user/instrument");
                setInstruments(res.data);

            } catch(error) {
                console.error(error);
            }
        }

        async function getGenres() {
            try {
                const res = await api.get("user/genre");
                setGenres(res.data);
            } catch (error) {
                console.error(error);
            }
        }

        void getGenres();
        void getInstruments();
    },[])


    const options = instruments.map((instrument: InstrumentProps) => ({value: instrument.id, label: instrument.name}));

    const optionsGenre = genres.map((genre: GenreProps) => ({value: genre.id, label: genre.name}));


    const handleInstrumentSelect = (selectedOptions: any) => {
        const selectedInstruments = selectedOptions.map((option: any) => ({
            id: option.value,
            name: option.label,
        }));
        setSelectedInstruments(selectedInstruments);
    };

    const handleGenreSelect = (selectedOptions: any) => {
        const selectedInstruments = selectedOptions.map((option: any) => ({
            id: option.value,
            name: option.label,
        }));
        setSelectedGenres(selectedInstruments);
    };

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            setFile(file);
            setFileName(file.name);
        }
    }

    async function handleSubmitForm(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try{
            if(!file){
                return;
            }
            const formData: FormData = new FormData();
            formData.append("file", file);
            const res = await api.post(`user/audio/upload`, formData, {
                headers:{
                    "Content-Type" : "multipart/form-data"
                }
            })
            const musicData = {
                id: 0,
                name: name,
                file: res.data,
                description: description,
                instruments: selectedInstruments,
                genres: selectedGenres
            }
            const res2 = await api.post(`user/addmusic`,musicData )
            alert(res2.data);
        }catch (error){
            console.error(error)
        }
    }
    return (
        <form onSubmit={handleSubmitForm}>
            <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="name"
            />

            <input
                type="file"
                onChange={handleFileChange}
            />

            <input
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="description"
            />

            <Select
                options={options}
                isMulti
                onChange={handleInstrumentSelect}
                placeholder="Wybierz instrumenty..."
            />

            <Select
                options={optionsGenre}
                isMulti
                onChange={handleGenreSelect}
                placeholder="Wybierz gatunek..."
            />

            <button type="submit" > Zatwierdz </button>

        </form>
    );
}