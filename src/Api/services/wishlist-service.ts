import axiosClient from "../lib/axios";

import { BASE_API } from "../../shared/components/constants/app";

export const AddToWishlist = async (userId: string, productId: string) => {
    const { data } = await axiosClient.post(BASE_API + `/favorite/${userId}/${productId}`)
    return data;
}