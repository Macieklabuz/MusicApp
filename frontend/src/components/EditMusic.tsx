import {useEffect, useState} from "react";
import api from "../utils/api.ts";

interface Props {
    oldName:string,
    oldDescription:string,
    oldFile: string
}
const EditMusic: React.FC<Props> = ({ oldName, oldDescription, oldFile }: Props) => {

    const [name, setName] = useState<string>(oldName)
    const [file, setFile] = useState<string>(oldFile);
    const [description, setDescription] = useState<string>(oldDescription);

    const [newFile, setNewFile] = useState<File>();

    useEffect(() => {
        async function getAudio(file: string) {
            try {
                const res = await api.get<Blob>(`/user/audio/file/${file}`, {
                    responseType: "blob",
                });
                if (res.data) {
                    const blob = URL.createObjectURL(res.data);
                    setNewFile(blob);
                } else {
                    console.log("Unable to load audio file");
                }
            } catch (error) {
                console.error("Error fetching audio file", error);
            }
        }

        void getAudio(file);
    }, []);
    });

    return (
        <form onSubmit={() => null}>
            <input
                value={name}
                onChange ={{event} => setName(event.target.value)}
            />
            <input
                value={description}
                onChange ={{event} => setDescription(event.target.value)}
            />
            <input
                value={file}
            />
        </form>
    );
}