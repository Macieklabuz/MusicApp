import { render, screen, waitFor } from "@testing-library/react";
import Home from "../pages/Home";
import api from "../utils/api";
import { vi } from "vitest";

vi.mock("../utils/api"); // Mockowanie modułu API

describe("Home Component", () => {
    const mockMusic = [
        {
            id: 1,
            file: "song1.mp3",
            name: "Test Song 1",
            likes: 10,
            artists: [{ id: 1, name: "Artist 1" }],
            album: { id: 1, name: "Test Album", image: "album1.jpg" },
            onClick: vi.fn(),
        },
    ];

    const mockMusicHistory = [
        {
            id: 2,
            file: "song2.mp3",
            name: "Test Song 2",
            likes: 5,
             artists: [{ id: 2, name: "Artist 2" }],
            album: null,
            onClick: vi.fn(),
        },
    ];

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("renders Home component with music and music history", async () => {
        // Mockowanie odpowiedzi API
        (api.get as jest.Mock).mockImplementation((url: string) => {
            if (url === "user/music") return Promise.resolve({ data: mockMusic });
            if (url === "user/history") return Promise.resolve({ data: mockMusicHistory });
            return Promise.reject(new Error("Invalid API call"));
        });

        render(<Home />);

        expect(screen.getByText("HOME")).toBeInTheDocument();

        // Sprawdzenie ładowania muzyki
        await waitFor(() => {
            expect(screen.getByText("Test Song 1")).toBeInTheDocument();
            expect(screen.getByText("Artist 1")).toBeInTheDocument();
        });

        // Sprawdzenie ładowania historii muzyki
        await waitFor(() => {
            expect(screen.getByText("Test Song 2")).toBeInTheDocument();
            expect(screen.getByText("Artist 2")).toBeInTheDocument();
        });
    });

    test("displays error message when API fails", async () => {
        // Wymuszenie błędu API
        (api.get as jest.Mock).mockRejectedValue(new Error("Failed to fetch"));

        render(<Home />);

        await waitFor(() => {
            expect(screen.getByText("Failed to fetch data")).toBeInTheDocument();
        });
    });
});
