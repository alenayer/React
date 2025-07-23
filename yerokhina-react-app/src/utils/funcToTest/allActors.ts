import { films } from "./films/films";

// -----------------2. Собрать в массив всех актеров всех фильмов (без повторения)------------
export const allActors = films.reduce((acc: string[], film) => {
    return film.actors.reduce((actorsAcc, actor) => {
        if (!actorsAcc.includes(actor)) {
            actorsAcc.push(actor);
        }
        return actorsAcc;
    }, acc)
}, [])