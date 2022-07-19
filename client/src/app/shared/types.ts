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
    price:number;
    start_date: Date;
    num_of_classes:number;
    category:string;
    first_name:string;
    last_name:string;
}

export interface category{
id:number;
name:string;
description: string;
} 

export type categoriesValue = category["id"]|'All'