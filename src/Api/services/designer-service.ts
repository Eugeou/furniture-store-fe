import { Designer } from "../types/entities/designer-entity";
import axiosClient from "../lib/axios";



export const GetAllDesigner = async (): Promise<Designer[]> => {
    const { data } = await axiosClient.get("/designer");
    return data;
};
