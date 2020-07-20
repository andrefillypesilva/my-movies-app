import { Category } from './category';

export interface Movie {
    _id: string,
    img: string,
    name: string,
    category: Category,
    category_name: string,
    duration: number
}