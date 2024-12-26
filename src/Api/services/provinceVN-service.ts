import axios from "axios";

const BaseUrl = "https://api.vnappmob.com/api/v2";


export type Province = {
    province_id: number;
    province_name: string;
    province_type: string;
};

export type District = {
    district_id: number;
    district_name: string;
};

export type Ward = {
    ward_id: number;
    ward_name: string;
};

export const getProvinces = async () => {
  return axios.get(BaseUrl + "/province/");
};

export const getDistrict = async (province_id: number) => {
  return axios.get(BaseUrl + "/province/district/" + province_id);
};

export const getWard = async (district_id: number) => {
  return axios.get(BaseUrl + "/province/ward/" + district_id);
};