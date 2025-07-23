import { describe, expect, it } from "vitest";
import { filmsNew } from "./filmsNew";

describe('filmsNew function', () => {

    // Тест 1 - проверка кол-ва  и названий полей каждого фильма))
    it('each film have only 4 field:id, title, released, plot', () => {
        filmsNew.forEach(film => {
            const keys = Object.keys(film); //Все ключи
            const expectedKeys = ['id', 'title', 'released', 'plot'];

            expect(keys.length).toBe(4); //должно быть 4
            expect(keys).toEqual(expectedKeys) //сравниваем с массивом

        })
    })
    // Тест 2 - проверка типов данных в каждом фильме
    it('each film have correct types values', () => {
        filmsNew.forEach(film => {
            expect(film).toEqual({
                id: expect.any(Number),
                title: expect.any(String),
                released: expect.any(String),
                plot: expect.any(String)
            })
        })
    })
})