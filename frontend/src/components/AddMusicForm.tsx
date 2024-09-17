import { FormEvent, useEffect, useState } from "react";
import api from "../utils/api";
import Select from "react-select";
import styled from "styled-components";

interface InstrumentProps {
    id: number;
    name: string;
}

interface GenreProps {
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

    useEffect(() => {
        async function getInstruments() {
            try {
                const res = await api.get("user/instrument");
                setInstruments(res.data);
            } catch (error) {
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
    }, [])

    const options = instruments.map((instrument: InstrumentProps) => ({ value: instrument.id, label: instrument.name }));
    const optionsGenre = genres.map((genre: GenreProps) => ({ value: genre.id, label: genre.name }));

    const handleInstrumentSelect = (selectedOptions: any) => {
        const selectedInstruments = selectedOptions.map((option: any) => ({
            id: option.value,
            name: option.label,
        }));
        setSelectedInstruments(selectedInstruments);
    };

    const handleGenreSelect = (selectedOptions: any) => {
        const selectedGenres = selectedOptions.map((option: any) => ({
            id: option.value,
            name: option.label,
        }));
        setSelectedGenres(selectedGenres);
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
        try {
            if (!file) {
                return;
            }
            const formData: FormData = new FormData();
            formData.append("file", file);
            const res = await api.post(`user/audio/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
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
            const res2 = await api.post(`user/addmusic`, musicData)
            alert(res2.data);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <FormContainer onSubmit={handleSubmitForm}>
            <InputField
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Name"
            />

            <FileInput
                type="file"
                onChange={handleFileChange}
            />

            <InputField
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Description"
            />

            <SelectStyled
                options={options}
                isMulti
                onChange={handleInstrumentSelect}
                placeholder="Select instruments..."
            />

            <SelectStyled
                options={optionsGenre}
                isMulti
                onChange={handleGenreSelect}
                placeholder="Select genres..."
            />

            <SubmitButton type="submit">Submit</SubmitButton>
        </FormContainer>
    );
}

// Styled Components
const FormContainer = styled.form`
    background-color: #121212;
    color: #fff;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-width: 600px;
    margin: 0 auto;
`;

const InputField = styled.input`
    background-color: #282828;
    border: 1px solid #333;
    border-radius: 5px;
    color: #fff;
    padding: 10px;
    font-size: 16px;
    outline: none;
    &:focus {
        border-color: #1db954;
    }
`;

const FileInput = styled.input`
    border: none;
    background-color: transparent;
    color: #fff;
    padding: 10px;
`;

const SelectStyled = styled(Select)`
    .react-select__control {
        background-color: #282828;
        border: 1px solid #333;
        border-radius: 5px;
        color: #fff;
    }
    .react-select__menu {
        background-color: #282828;
    }
    .react-select__option {
        color: #fff;
        &:hover {
            background-color: #1db954;
        }
    }
`;

const SubmitButton = styled.button`
    background-color: #1db954;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #1ed760;
    }
`;
