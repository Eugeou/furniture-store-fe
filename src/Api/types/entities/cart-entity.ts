export type CreateCart = {
    productId: string;
    colorId: string;
    dimension: string;
    quantity: number;
};

export type Cart = {
    Id: string;
    ProductId: string;
    ProductName: string;
    Dimension: string;
    ColorId: string;
    ColorName: string;
    Price: number;
    Quantity: number;
    SubTotal: number;
};