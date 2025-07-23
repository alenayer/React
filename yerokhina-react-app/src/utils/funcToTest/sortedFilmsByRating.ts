import { films } from "./films/films";

// -----------------------3. Сортировать фильмы по рейтингу по убыванию-------------
export const sortedFilmsByRating = [...films].sort((a, b) => b.imdbRating - a.imdbRating);