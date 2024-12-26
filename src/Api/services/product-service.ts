// api/createProduct.ts
// import axios from 'axios';
import FormData from 'form-data';
import { ProductGet } from '../types/entities/product-entity';
import axiosClient from '../lib/axios';


export const GetAllProducts = async (): Promise<ProductGet[]> => {
  const { data } = await axiosClient.get('/product');
  return data;
};


export const GetDetailProduct = async (id: string): Promise<ProductGet> => {
  const { data } = await axiosClient.get(`/product/${id}`);
  return data;
};

