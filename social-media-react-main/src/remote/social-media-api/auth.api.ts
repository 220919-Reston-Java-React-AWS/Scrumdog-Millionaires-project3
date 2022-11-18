import { NamedTupleMember } from "typescript";
import { DirectMessageModel } from "../../models/DirectMessageModel";
import socialClient, { socialApiResponse } from "./socialClient";

const baseURL = "/auth"

export const apiLogin = async (email: string, password: string): Promise<socialApiResponse> => {
    const response = await socialClient.post<any>(
        `${baseURL}/login`,
        { email: email, password: password }
    );
    return { status: response.status, payload: response.data };
}
export const apiChangePassword = async ( email: string, password: string): Promise<socialApiResponse> => {
    const response = await socialClient.put<any>(
        `${baseURL}/change-password`,
        { email: email, password: password }, { withCredentials: false }

    );
    return { status: response.status, payload: response.data };
}

export const apiLogout = async (): Promise<socialApiResponse> => {
    const response = await socialClient.post<any>(
        `${baseURL}/logout`
    );
    localStorage.clear();
    console.log(localStorage);
    return { status: response.status, payload: response.data };
}



export const apiRegister = async (firstName: string, lastName: string, email: string, password: string): Promise<socialApiResponse> => {
    const response = await socialClient.post<any>(
        `${baseURL}/register`,
        { firstName: firstName, lastName: lastName, email: email, password: password }
    );
    return { status: response.status, payload: response.data };
}

export const apiSendMsg = async (dm: DirectMessageModel, receiver_id: number, text: string): Promise<socialApiResponse> => {
    const response = await socialClient.post<any>(
        `/message/send/${receiver_id}`,
        {dm: dm, text: text}
    );
    console.log(text);
    // response.data.text = dm.text;
    return { status: response.status, payload: response.data};
}

export const apiGetMgsBetweenUsers = async (sender_id: number): Promise<socialApiResponse> => {
    const response = await socialClient.get<any>(
        `message/received/${sender_id}`
    );

    return { status: response.status, payload: response.data };
}