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
                                        oldInstruments,}: Props) => {
    const [id] = useState<number>(oldId); // Dodanie ID do stanu
    const [name, setName] = useState<string>(oldName);
    const [file, setFile] = useState<string>(oldFile);
    const [description, setDescription] = useState<string>(oldDescription);
    const [newFileUrl, setNewFileUrl] = useState<string | null>(null); // URL dla wyświetlenia aktualnego pliku
    const [newFile, setNewFile] = useState<File | null>(null); // Nowy plik wybrany przez użytkownika
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

    // Obsługa zmiany pliku
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setNewFile(file);
            setNewFileUrl(URL.createObjectURL(file)); // Ustawienie podglądu nowego pliku
            setFile(file.name);
        }
    };

    // Dodana funkcja handleSubmit
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
                alert("Muzyka została zaktualizowana pomyślnie!");
            } catch (error) {
                console.error("Błąd podczas aktualizacji pliku:", error);
            }
        }



        try {
        const newMusic ={
            id: id,
            name: name,
            file: newFileName ? newFileName.data : file,
            description: description,
            instruments: selectedInstruments,
            genres: selectedGenres

        }
            await api.put("user/updatemusic", newMusic);
            alert("Muzyka została zaktualizowana pomyślnie!");
        } catch (error) {
            console.error("Błąd podczas aktualizacji muzyki:", error);
        }
    };

    return (
        <ModalOverlay>
            <ModalContent>
                <ExitIcon />
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
                    {/* Pole wyboru pliku dla nowego pliku audio */}
                    <Input type="file" accept="audio/*" onChange={handleFileChange} />

                    {/* Wyświetlanie aktualnego pliku audio */}
                    {newFileUrl && (
                        <audio controls src={newFileUrl}>
                            Your browser does not support the audio element.
                        </audio>
                    )}
                    <Select
                        options={options}
                        isMulti
                        onChange={handleInstrumentSelect}
                        placeholder="Wybierz instrumenty..."
                        value={selectedInstruments.map((instrument) => ({
                            value: instrument.id,
                            label: instrument.name,
                        }))}
                    />

                    <Select
                        options={optionsGenre}
                        isMulti
                        onChange={handleGenreSelect}
                        placeholder="Wybierz gatunek..."
                        value={selectedGenres.map((genre) => ({
                            value: genre.id,
                            label: genre.name,
                        }))}
                    />

                    <button type="submit"> Zatwierdz</button>
                </Form>
            </ModalContent>
        </ModalOverlay>
    );
};

export default EditMusic;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    position: relative;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    width: 600px;
    z-index: 1001;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    margin-bottom: 10px;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const ExitIcon = styled(AiFillCloseCircle)`
    position: absolute;
    top: 10px;
    right: 10px;
`;
