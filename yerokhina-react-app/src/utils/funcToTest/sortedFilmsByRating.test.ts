import { describe, expect, it } from "vitest";
import { sortedFilmsByRating } from './sortedFilmsByRating';
import { films } from "./films/films";

describe('sortedFilmsByRating function', () => {
    // Тест 1 - проверка что кол-во фильмов не изменилось(ни один не потерялся при сортировке)
    it('should have the same length as original films array', () => {
        expect(sortedFilmsByRating.length).toBe(films.length)
    })

    // Тест 2 - проверка что что у первого фильма максимальный рейтинг
    it('first film have highest rating',()=>{
        const highestRating = Math.max(...films.map(film=>film.imdbRating));
        expect(sortedFilmsByRating[0].imdbRating).toBe(highestRating)
    })
    // Тест 3 - проверка что что у последнего фильма минимальный рейтинг
    it('last film have lowest rating',()=>{
        const lowestRating = Math.min(...films.map(film=>film.imdbRating));
        expect(sortedFilmsByRating[sortedFilmsByRating.length-1].imdbRating).toBe(lowestRating)
    })
})

