import { StoreLogin } from "../types/entities/auth-entity";
import axiosClient from "../lib/axios";
import axios from "axios";
import { BASE_API } from "../../shared/components/constants/app";

// // const getAccessToken = () => (typeof window !== "undefined" ? localStorage.getItem("access_token") : null);
// const accessToken = localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : null;

// // const parseToken = accessToken ? ParseJSON(accessToken) : null;

// // export const loginUser = async (username: string, password: string) => {

// //     const envLogin = BASE_API + "/auth/login"
// //     try {
// //       const response = await fetch(envLogin, {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json'
// //         },
// //         body: JSON.stringify({ username, password })
// //       });
// //       if (!response.ok) {
// //         throw new Error('Tên đăng nhập hoặc mật khẩu không chính xác');
// //       }
// //       const data = await response.json();
// //       return data;
// //     } catch (error) {
// //       throw new Error('Đã xảy ra lỗi khi đăng nhập');
// //     }
// // };

// // export const login = async (bodyLogin: StoreLogin) => {
// //     const { data } = await axios.post<{
// //       data: any
// //     }>(BASE_API + '/auth/login', bodyLogin, {
// //       baseURL: BASE_API
// //     })
// //     return data
// // }

export const login = async (bodyLogin: StoreLogin) => {
    const loginURL = BASE_API + "/auth/login";
    try {
        const response = await axios.post(loginURL, bodyLogin);
        return response;
    } catch (error) {
        console.error(error);
        throw new Error('Login failed');
    }
}

// export const logout = async (): Promise<void> => {
  
//     const LogOutURL = BASE_API + "/auth/signout";
  
//     const config = {
//       method: 'post',
//       maxBodyLength: Infinity,
//       url: LogOutURL,
//       headers: {
//         'Authorization': `Bearer ${accessToken}`,
//       }
//     };
  
//     try {
//       const response = await axios.request(config);
//       console.log(JSON.stringify(response.data));
//     } catch (error) {
//       console.error(error);
//       throw new Error('Logout failed');
//     }
// };

export const logout = async (userId: string)=> {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const { data } = await axiosClient.post(BASE_API + '/auth/signout', JSON.stringify(userId) , config)
  return data;
}

export const GetMe = async ()=> {
  const { data } = await axiosClient.get(BASE_API + '/auth/me', {
    baseURL: BASE_API
  })
  return data
}
  
export const refreshTokenService = async (refreshToken: string, userId: string): Promise<{ access: string }> => {
  const { data } = await axios.post<{ access: string }>(
    BASE_API + '/auth/refreshToken',
    { token: refreshToken, userId },
    {
      baseURL: BASE_API
    }
  )
  return data
}

  

  