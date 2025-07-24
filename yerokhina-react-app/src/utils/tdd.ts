//Test Driving Design
export function divide(a:number,b:number, num?:number):number {
    if(!b) throw new Error('Invalid second parameter')
        return Number((a/b).toFixed(num||1))
};