import { films } from "./films/films";

// ----------------4. Создать новый массив, где объекты фильмов будут состоять из следующих полей:id, title, released, plot
export const filmsNew = films.map((film) =>
    ({
        id: film.id,
        title: film.title,
        released: film.released,
        plot: film.plot
    
    })
    )