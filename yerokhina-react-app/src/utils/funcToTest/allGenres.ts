import { films } from "./films/films";

//----------------1. Собрать в массив все жанры фильмов (без повторения)------------
export const allGenres = films.reduce((acc: string[], film) => {
    return film.genre.reduce((genresAcc, genre) => {
        if (!genresAcc.includes(genre)) {
            genresAcc.push(genre);
        }
        return genresAcc;
    }, acc);
}, [])