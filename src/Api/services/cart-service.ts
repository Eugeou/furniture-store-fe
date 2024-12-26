import { CreateCart, Cart } from "../types/entities/cart-entity";
import axiosClient from "../lib/axios";
import { BASE_API } from "../../shared/components/constants/app";

export const createCart = async (userId: string, body: CreateCart) => {
    
    try {
        const response = await axiosClient.post(BASE_API + `/cart/${userId}`, body);
        return response;
    } catch (error) {
        console.error(error);
        throw new Error('Create cart failed');
    }
}

export const getCart = async (userId: string) => {
    try {
        const response = await axiosClient.get(BASE_API + `/cart/${userId}`);
        return response;
    } catch (error) {
        console.error(error);
        throw new Error('Get cart failed');
    }
}

export const updateCart = async (cartItemId : string, quantity : number) => {
    try {
        const response = await axiosClient.put(BASE_API + `/cart/${cartItemId}`, {quantity});
        return response;
    } catch (error) {
        console.error(error);
        throw new Error('Update cart failed');
    }
}

export const deleteCart = async (cartItemId : string) => {
    try {
        const response = await axiosClient.delete(BASE_API + `/cart/${cartItemId}`);
        return response;
    } catch (error) {
        console.error(error);
        //throw new Error('Delete cart failed');
    }
}