export type CreatedOrder = {
    PhoneNumber: string;
    Email: string;
    PaymentMethod: number;
    ShippingFee: number;
    Note: string;
    CouponId?: string;
    UserId : string;
    AddressId: string;
    TaxFee: number;
    SubTotal: number;
    Total: number;
    OrderItems: string[];
}