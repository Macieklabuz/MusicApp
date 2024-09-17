import { useEffect, useState } from "react";
import api from "../utils/api.ts";
import styled from "styled-components";
import Select from "react-select";
import { AiFillCloseCircle } from "react-icons/ai";

interface Props {
    oldId: number;
    oldName: string;
    oldDescription: string;
    oldFile: string;
    oldGenres: GenreProps[];
    oldInstruments: InstrumentProps[];
    handleEditMode: () => void;
}

interface InstrumentProps {
    id: number;
    name: string;
}

interface GenreProps {
    id: number;
    name: string;
}

const EditMusic: React.FC<Props> = ({
                                        oldId,
                                        oldName,
                                        oldDescription,
                                        oldFile,
                                        oldGenres,
                                        oldInstruments,
                                        handleEditMode
                                    }: Props) => {
    const [id] = useState<number>(oldId);
    const [name, setName] = useState<string>(oldName);
    const [file, setFile] = useState<string>(oldFile);
    const [description, setDescription] = useState<string>(oldDescription);
    const [newFileUrl, setNewFileUrl] = useState<string | null>(null);
    const [newFile, setNewFile] = useState<File | null>(null);
    const [instruments, setInstruments] = useState<InstrumentProps[]>([]);
    const [genres, setGenres] = useState<GenreProps[]>([]);
    const [selectedInstruments, setSelectedInstruments] = useState<InstrumentProps[]>(oldInstruments);
    const [selectedGenres, setSelectedGenres] = useState<GenreProps[]>(oldGenres);

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
    }, []);

    const options = instruments.map((instrument: InstrumentProps) => ({
        value: instrument.id,
        label: instrument.name,
    }));

    const optionsGenre = genres.map((genre: GenreProps) => ({
        value: genre.id,
        label: genre.name,
    }));

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

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setNewFile(file);
            setNewFileUrl(URL.createObjectURL(file));
            setFile(file.name);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let newFileName = null;

        if (newFile) {
            const formData = new FormData();
            formData.append("file", newFile);
            try {
                newFileName = await api.post("user/audio/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            } catch (error) {
                console.error("Błąd podczas aktualizacji pliku:", error);
            }
        }

        try {
            const newMusic = {
                id: id,
                name: name,
                file: newFileName ? newFileName.data : file,
                description: description,
                instruments: selectedInstruments,
                genres: selectedGenres
            };
            await api.put("user/updatemusic", newMusic);
            alert("Muzyka została zaktualizowana pomyślnie!");
            handleEditMode(); // Close modal on successful update
        } catch (error) {
            console.error("Błąd podczas aktualizacji muzyki:", error);
        }
    };

    return (
        <ModalOverlay>
            <ModalContent>
                <ExitIcon onClick={handleEditMode} />
                <Form onSubmit={handleSubmit}>
                    <Input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Name"
                    />
                    <Input
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="Description"
                    />
                    <FileInput type="file" accept="audio/*" onChange={handleFileChange} />
                    {newFileUrl && (
                        <AudioPreview controls src={newFileUrl}>
                            Your browser does not support the audio element.
                        </AudioPreview>
                    )}
                    <Select
                        options={options}
                        isMulti
                        onChange={handleInstrumentSelect}
                        placeholder="Select instruments..."
                        value={selectedInstruments.map((instrument) => ({
                            value: instrument.id,
                            label: instrument.name,
                        }))}
                    />
                    <Select
                        options={optionsGenre}
                        isMulti
                        onChange={handleGenreSelect}
                        placeholder="Select genres..."
                        value={selectedGenres.map((genre) => ({
                            value: genre.id,
                            label: genre.name,
                        }))}
                    />
                    <SubmitButton type="submit">Confirm</SubmitButton>
                </Form>
            </ModalContent>
        </ModalOverlay>
    );
};

export default EditMusic;

// Styled Components
const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    position: relative;
    background-color: #181818; /* Dark background similar to Spotify */
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    width: 600px;
    z-index: 1001;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Input = styled.input`
    padding: 10px;
    font-size: 16px;
    border: 1px solid #333;
    border-radius: 4px;
    background-color: #121212; /* Dark background for input */
    color: #fff; /* White text */
`;

const FileInput = styled(Input)`
    padding: 0;
    font-size: 14px;
`;

const AudioPreview = styled.audio`
    margin-top: 10px;
    width: 100%;
    border-radius: 4px;
`;

const SubmitButton = styled.button`
    background-color: #1db954; /* Spotify Green */
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #1ed760; /* Slightly lighter green on hover */
    }
`;

const ExitIcon = styled(AiFillCloseCircle)`
    position: absolute;
    top: 10px;
    right: 10px;
    color: #1db954; /* Spotify Green for close icon */
    cursor: pointer;
    font-size: 24px;
`;
