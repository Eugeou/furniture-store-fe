import { Category } from "../types/entities/category-entity";
import axiosClient from "../lib/axios";


export const GetAllCategory = async (): Promise<Category[]> => {
    const { data } = await axiosClient.get("/category");
    return data;
};

export const GetCategoryById = async (id: string): Promise<Category> => {
    const { data } = await axiosClient.get(`/category/${id}`);
    return data;
};