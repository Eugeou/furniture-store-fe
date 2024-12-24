import { Brand } from "../types/entities/brand-entity";
import axiosClient from "../lib/axios";



export const GetAllBrand = async (): Promise<Brand[]> => {
    const { data } = await axiosClient.get("/brand");
    return data;
};


export const GetBrandById = async (id: string): Promise<Brand> => {
    const { data } = await axiosClient.get(`/brand/${id}`);
    return data;
};