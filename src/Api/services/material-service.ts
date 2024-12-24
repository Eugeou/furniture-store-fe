import { Material } from "../types/entities/material-entity";
import axiosClient from "../lib/axios";


export const GetAllMaterial = async (): Promise<Material[]> => {
    const { data } = await axiosClient.get("/material");
    return data;
};

