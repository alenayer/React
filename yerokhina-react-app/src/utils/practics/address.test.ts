import { expect, test } from "vitest"
// import formatAddress from "./address"
import { checkValue } from "./address"


// const AddressMock = {
//     'street': '1',
//     'suite': '2',
//     'city': '3',
//     'zipcode': '4',
//     'geo': {
//         'lat': '5',
//         'lng': '6',
//         // geo откинется
//     },
// }


// test('formatAdress fn return valid string ', () => {
//     expect(formatAddress(AddressMock)).toBe('1, 2, 3, 4')
// })

// npm i vitest для установки 
// npm run test (запуск ВСЕХ тестов)
// npm run test address.test.ts (запуск конкретного)


test('checkValue fn', () => {
    expect(checkValue(-10)).toBe('Negative Value')
    expect(checkValue(0.5)).toBe('Value is not 10!')
    expect(checkValue(5)).toBe('value is still not 10!')
    expect(checkValue(11)).toBe('value is greater than 10!')
})
