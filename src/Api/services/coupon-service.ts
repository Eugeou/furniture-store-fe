import { Coupon, ExistedCoupon } from "../types/entities/coupon-entity";
import axiosClient from "../lib/axios";


export const GetAllCoupons = async (): Promise<ExistedCoupon[]> => {
    const { data } = await axiosClient.get('/coupon');
    return data;
};


export const GetDetailCoupon = async (id: string): Promise<ExistedCoupon> => {
    const { data } = await axiosClient.get(`/coupon/${id}`);
    return data;
};


