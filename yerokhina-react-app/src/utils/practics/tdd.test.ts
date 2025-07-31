import { divide } from "../tdd"

// Триколор - сначала пишем тест падающий (красный)-> на основе него поправляем функцию потом пишем зеленый и рефакторинг
test('divide fn return a number', ()=>{
    expect(divide(10,2)).toBe(5) //start - red color

    expect (divide(10,3)).toBe(3.3)

    expect (divide(10,3,2)).toBe(3.33)

    const wrapper = ()=>divide(10,0)
    expect(wrapper).toThrow('Invalid second parameter')
})