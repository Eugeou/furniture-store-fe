import axiosClient from "../lib/axios";
import { CustomerEntity } from "../types/entities/customer-entity";

export const GetAllCustomers = async (): Promise<CustomerEntity[]> => {
    const { data } = await axiosClient.get("/customer");
    return data;
}

export const GetDetailCustomer = async (id: string): Promise<CustomerEntity> => {
    const { data } = await axiosClient.get(`/customer/${id}`);
    return data;
}


