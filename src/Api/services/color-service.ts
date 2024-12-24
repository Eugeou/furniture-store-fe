import { Colors } from '../types/entities/color-entity';
import axiosClient from '../lib/axios';


export const GetAllColors = async (): Promise<Colors[]> => {
    const { data } = await axiosClient.get("/color");
    return data;
}


