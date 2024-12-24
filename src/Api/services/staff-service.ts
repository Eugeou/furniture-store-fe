import axiosClient from "../lib/axios";
import { StaffEntity } from "../types/entities/staff-entity";

export const GetAllStaffs = async (): Promise<StaffEntity[]> => {
    const { data } = await axiosClient.get("/staff");
    return data;
}

export const GetDetailStaff = async (id: string): Promise<StaffEntity> => {
    const { data } = await axiosClient.get(`/staff/${id}`);
    return data;
}

