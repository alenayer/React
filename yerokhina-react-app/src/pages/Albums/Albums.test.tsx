
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router";
import axios from "axios";
import { Albums } from './Albums';

//     const router = createMemoryRouter(
//       [
//         {
//           path: "/albums",
//           element: ui,
//         },
//       ],
//       { initialEntries: ["/albums"] }
//     );
//     return render(<RouterProvider router={router} />);
//   };

// ✅ Правильный мок axios для Vitest
vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
  },
}));

const mockedAxios = axios as unknown as { get: ReturnType<typeof vi.fn> };

describe("Albums component (React Router v7 + axios)", () => {
  // 1 spinner
  // 2 list
  // 3 error
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const renderWithRouter = () => {
    return render(<MemoryRouter initialEntries={['/albums']}><Albums/></MemoryRouter>);
  };

  it("shows spinner while loading", () => {
    // Оставляем axios в pending
    mockedAxios.get.mockImplementationOnce(() => new Promise(() => {}));
    renderWithRouter();
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("renders albums after loading", async () => {
    const mockAlbums = [
      { userId: 1, id: 1, title: "Album 1" },
      { userId: 1, id: 2, title: "Album 2" },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: mockAlbums });

    renderWithRouter();

    await waitFor(() =>
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument()
    );

    expect(screen.getByTestId("albums_page")).toHaveTextContent("Albums page");
    const albums = screen.getAllByTestId("album");
    expect(albums).toHaveLength(2);
  });

  it("renders error message if request fails", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Network error")); // ❌ ошибка

    renderWithRouter();

    await waitFor(() =>
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument()
    );

    expect(screen.getByTestId("error")).toHaveTextContent(
      "Failed to load albums"
    );
  });
});