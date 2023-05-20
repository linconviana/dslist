export type Game = {
    id: number,
    title: string,
    year: number,
    imgUrl: string,
    shortDescription: string
}

export type GameFull = {
    id: number,
    title: string,
    year: number,
    genre: string,
    platforms: string,
    score: number,
    imgUrl: string,
    shortDescription: string,
    longDescription: string,
    listId: number;
}

export type ListGame = {
    data?: Game [];
}