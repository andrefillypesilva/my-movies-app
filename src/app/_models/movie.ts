import { Category } from './category';

export interface Movie {
    id: number,
    img: string,
    name: string,
    category: Category,
    category_name: string,
    duration: number
}