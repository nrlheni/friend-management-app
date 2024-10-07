export interface Mutual {
    id: number;
    imgUrl: string;
    name: string;
    email: string;
}

export interface Friend {
    id: number;
    imgUrl: string;
    name: string;
    email: string;
    mutuals: Mutual[];
}