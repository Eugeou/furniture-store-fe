import axiosClient from "../lib/axios";
import { BASE_API } from "../../shared/components/constants/app";
import { CreatedOrder } from "../types/entities/order-entity";

export const CreateOrder = async (data: CreatedOrder) => {
    const formData = new FormData();
    formData.append("PhoneNumber", data.PhoneNumber);
    formData.append("Email", data.Email);
    formData.append("PaymentMethod", data.PaymentMethod.toString());
    formData.append("ShippingFee", data.ShippingFee.toString());
    formData.append("Note", data.Note);
    formData.append("CouponId", data.CouponId || "");
    formData.append("UserId", data.UserId);
    formData.append("AddressId", data.AddressId);
    formData.append("TaxFee", data.TaxFee.toString());
    formData.append("SubTotal", data.SubTotal.toString());
    formData.append("Total", data.Total.toString());
    data.OrderItems.forEach((item) => {
        formData.append("OrderItems", item);
    });

    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    };

    try {
        const response = await axiosClient.post(`${BASE_API}/order`, formData, config);
        return response;
    } catch (error) {
        return error;
    }
};