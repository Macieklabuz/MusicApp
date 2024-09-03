import api from "./api.ts";

    // Pobieranie obrazu albumu
    async function getImage(image: string, setImageData: (image: string) => void) {
        try {
            const res = await api.get<Blob>(`/user/file/${image}`, {
                responseType: "blob",
            });
            if (res.data) {
                const blob = URL.createObjectURL(res.data);
                setImageData(blob);
            } else {
                console.log("Unable to load album image");
            }
        } catch (error) {
            console.error("Error fetching album image", error);
        }
    }

    export default getImage;