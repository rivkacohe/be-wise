export interface lecturer {
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    country_id: number;
    started_teaching: Date;
    image: string;
}

export interface course {
    code: string;
    name: string;
    description: string;
    price: number;
    start_date: Date;
    num_of_classes: number;
    category: string;
    lecturer_id: number;
    first_name: string;
    last_name: string;
}

export interface category {
    id: number;
    name: string;
    description: string;
}

export type categoriesValue = category["id"] | 'All';


export type sortColumn = 'name' | 'price';

export interface CourseSort {
    column: sortColumn;
    dirAsc: boolean;
}

export interface FilePath {
    name: string;
}
export interface student {
    first_name?: string| null;
    last_name?: string| null;
    address?: string| null;
    gender?: string| null;
    course_code?: string| null;
    email?: string | null;
}
