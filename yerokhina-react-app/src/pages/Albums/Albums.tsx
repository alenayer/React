
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

type Album = {
  userId: number;
  id: number;
  title: string;
};

export const Albums = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/albums")
        .then((res) => setAlbums(res.data))
        .catch(() => setError("Failed to load albums")) // ✅ обработка ошибки
        .finally(() => setIsLoading(false));
  }, []);
  return (
    <>
      <h1 data-testid="albums_page">Albums page</h1>
      <Link to={"/"}>Go home</Link>
      {isLoading && <h1 data-testid="spinner">spinner</h1>}
      {error && <p data-testid="error">{error}</p>} {/* ✅ отображаем ошибку */}
      <ol>
        {albums &&
          albums.map(({ title, id }) => (
            <Link to={`/albums/${id}`} data-testid="album" key={id}>
              <li>{title}</li>
            </Link>
          ))}
      </ol>
    </>
  );
};