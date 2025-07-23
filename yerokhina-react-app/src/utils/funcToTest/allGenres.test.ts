import { describe, expect, it } from "vitest";
import { allGenres } from "./allGenres";
import { films } from "./films/films";

describe('allGenres function',()=>{
    //Тест 1 - проверка типа данных(массив)
    it('should be an array', ()=>{
        expect(Array.isArray(allGenres)).toBe(true)
    })
    //Тест 2 - наличие жанра(Драма)
    it('should contain Drama', ()=>{
        expect(allGenres).toContain("Drama");
    })
    // Тест 3 - отсутствие дублей
    it('should not have dublicates',()=>{
       const uniqueGenres = [...new Set(allGenres)];
       expect((uniqueGenres.length)).toBe(allGenres.length)
    })


    //Тест 4 - Проверка количества жанров
    it('should have unique 6 genres',()=>{
        expect(allGenres.length).toBe(6)
    })
    // Более устойчивый вариант (сравнение с расчетным значением = актуальное наличие жанров)-но не поймает случайное удаление
    it('should have correct number of genres',()=>{
        const expectedGenres = [...new Set(films.flatMap(film=>film.genre))];
        expect(expectedGenres.length).toBe(allGenres.length)
    })
    // Проверка наличия ключевых жанров без учета количества
    it('should have main genres Action Fantasy Adventure',()=>{
        expect(allGenres).toEqual(expect.arrayContaining(['Action','Fantasy','Adventure']))
    })
})