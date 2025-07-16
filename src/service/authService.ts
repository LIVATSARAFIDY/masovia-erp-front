import { api } from "./api.ts";
import { type User } from "../type.ts";

export const loginRequest = async (email: string, password: string) => {
    const data = await api.post<User & {token:string}>('auth/login', {
        json: {
            email,
            password,
        }
    }).json();
    return data;
}

export const registerRequest = async (firstname: string, lastname: string, email: string, password: string) => {
    try {
        const data:User & {token:string} = await api.post<User & {token:string}>('auth/register', {
            json: {
                firstname,
                lastname,
                email,
                password,
                userStatus:"TRIAL",
                roleId:1
            }
        }).json();
        console.log('registerRequest data', data);
        return data;
        
    } catch (error) {
        console.log('Error in registerRequest:', error);
        throw error;
    }

}