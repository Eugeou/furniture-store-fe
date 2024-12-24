import { RoomSpace } from "../types/entities/roomspace-entity";
import axiosClient from "../lib/axios";



export const GetAllRoomSpace = async (): Promise<RoomSpace[]> => {
    const { data } = await axiosClient.get("/roomspace");
    return data;
};

