import axios, { AxiosResponse } from "axios";

const BACKENDURL: string = "http://localhost:5001";

interface ILogin {
    email: string;
    password: string;
}

interface ISignUp {
    username: string,
    email: string,
    password: string,
    role: string
}

interface IApplyLeave {
    start_date: string,
    end_date: string,
    leave_type: string,
    description: string,
    user_name: string,
    email: string
}

const instance = axios.create({
    baseURL: "http://localhost:5001",
})

export const setAuthToken = (token: string | null) => {
    instance.interceptors.request.use((request) => {
        request.headers.Authorization = `Bearer ${token}`
        return request
    })
    instance.interceptors.response.use((response) => {
        return response
    }, (error) => {
        console.log(error);
    })
};

//Login user
export const userLogin = async (payload: ILogin): Promise<AxiosResponse> => {
    const path = `${BACKENDURL}/api/users/login`;
    const res: AxiosResponse = await axios.post(path, payload);
    return res;
};

//SignUp user
export const userSignUp = async (payload: ISignUp): Promise<AxiosResponse> => {
    const path = `${BACKENDURL}/api/users/register`;
    const res: AxiosResponse = await axios.post(path, payload);
    return res;
};

//Apply Leave 
export const applyLeave = async (payload: IApplyLeave): Promise<AxiosResponse> => {
    const path = `/api/contacts`;
    const res: AxiosResponse = await instance.post(path, payload);
    return res;
}

//Pending Request  
export const pendingRequest = async (): Promise<AxiosResponse> => {
    const path = `/api/contacts/all`;
    const res: AxiosResponse = await instance.get(path);
    return res;
}

//update leave 
export const approveLeave = async (id : string):  Promise<AxiosResponse> => {
    const path = `/api/contacts/${id}`;
    const res: AxiosResponse = await instance.put(path);
    return res;
}

//update leave 
export const rejectLeave = async (id : string):  Promise<AxiosResponse> => {
    const path = `/api/contacts/reject/${id}`;
    const res: AxiosResponse = await instance.put(path);
    return res;
}