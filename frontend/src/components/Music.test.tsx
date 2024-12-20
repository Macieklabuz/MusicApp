import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Music } from "../components/Music";
import api from "../utils/api";
import { vi } from "vitest";

vi.mock("../utils/api"); // Mockowanie API

describe("Music Component", () => {
    const mockMusicProps = {
        id: 1,
        file: "song.mp3",
        name: "Test Song",
        likes: 10,
        artists: [{ id: 1, name: "Artist 1" }],
        album: { id: 1, name: "Test Album", image: "album.jpg" },
        onClick: vi.fn(),
    };

    test("renders music component with correct data", () => {
        render(<Music key = {1} {...mockMusicProps} />);

        // Sprawdzanie wyświetlanych elementów
        expect(screen.getByText("Test Song")).toBeInTheDocument();
        expect(screen.getByText("Artist 1")).toBeInTheDocument();
        expect(screen.getByText("10")).toBeInTheDocument();
        expect(screen.getByRole("img")).toHaveAttribute("src", "album.jpg");
    });

    test("plays music and adds to history on play", async () => {
        (api.post as jest.Mock).mockResolvedValue({});

        render(<Music key = {1} {...mockMusicProps} />);

        const audioElement = screen.getByRole("audio");
        await userEvent.click(audioElement);

        expect(api.post).toHaveBeenCalledWith("/user/addhistory", { id: 1 });
    });
});
