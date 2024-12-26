import axiosClient from "../lib/axios";
import { BASE_API } from "../../shared/components/constants/app";
import { CreateAddress, Address } from "../types/entities/address-entity";

export const createAddress = async (userId: string, data: CreateAddress) => {
    return axiosClient.post(`${BASE_API}/user/address/${userId}`, data);
};

export const getAddress = async (userId: string) => {
    return axiosClient.get<Address[]>(`${BASE_API}/user/address/${userId}`);
};

export const deleteAddress = async (addressId: string) => {
    return axiosClient.delete(`${BASE_API}/user/address/${addressId}`);
};

export const updateAddress = async (addressId: string, data: CreateAddress) => {
    return axiosClient.put(`${BASE_API}/user/address/${addressId}`, data);
};