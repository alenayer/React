import { describe, expect, it } from "vitest";
import { allActors } from "./allActors";


describe('allActors function', ()=>{
    // Тест 1 - проверяем что функция возвращает массив
    it('should return an array', ()=>{
        expect(Array.isArray(allActors)).toBe(true)
    })

    //Тест 2 - проверяем наличие актера 
    it('should contain Scarlett Johansson',()=>{
        expect(allActors).toContain("Scarlett Johansson"); //ищем актера в массиве
    })

    // Тест 3 - проверяем наличие актеров из разных фильмов
    it('should contain actors from all films',()=>{
        const expectedActors=[
            "Scarlett Johansson",
            "Daniel Radcliffe",
            "Mark Hamill"
        ];
        expectedActors.forEach(actor=>{
            expect(allActors).toContain(actor)
        })
    })
    // Тест 4 - Проверяем отсутствие дубликатов
    it('should not contain dublicates', ()=>{
        const uniqueActors =[...new Set(allActors)]; //set хранит только уникальные значения(без дублей)-> ... - превращаем обратно в массив но уже без дублей
        expect(uniqueActors.length).toBe(allActors.length)
    })


    // Тест 5 - Проверяем что все элементы строки
    it('should contain only strings',()=>{
        allActors.forEach(actor=>{
            expect(typeof actor).toBe('string')
        })
    })
    // Тест 6 - Проверяем кол-во актеров(у нас их 10-падает)
    it('should contain 11 actors',()=>{
            expect(allActors.length).toBe('11')
    })
})