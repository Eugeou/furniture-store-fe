export type CreateAddress = {
    province: string;
    district: string;
    ward: string;
    specificAddress: string;
    postalCode: string;
    isDefault: boolean;
};

export type Address = {
    Id: string;
    Province: string;
    District: string;
    Ward: string;
    SpecificAddress: string;
    PostalCode: string;
    IsDefault: boolean;
};