import axiosClient from "../lib/axios";
import { BASE_API } from "../../shared/components/constants/app";
import { UpdateCustomer } from "../types/entities/customer-entity";

export const ChangeAvatar = async (userId: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return await axiosClient.post(`${BASE_API}/user/avatar/${userId}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

export const EditCustomer = async (id: string, customer: UpdateCustomer) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    return await axiosClient.put(`/customer/${id}`, customer, config);
}
