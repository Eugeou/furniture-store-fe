import { Furnitype } from "../types/entities/furnitype-entity";
import axiosClient from "../lib/axios";



export const GetAllFurnitype = async (): Promise<Furnitype[]> => {
    const { data } = await axiosClient.get("/furnitureType");
    return data;
};
