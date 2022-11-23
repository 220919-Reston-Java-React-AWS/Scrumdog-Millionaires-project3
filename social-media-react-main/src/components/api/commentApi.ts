import axios, {AxiosResponse} from "axios";
import Comment from "../../models/Comments";

const instance = axios.create({
    baseURL: "http://localhost:8080/comments",
    timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;


const request = {
    get: (url: string) => instance.get(url).then(responseBody),
    delete:(url:string) => instance.delete(url).then(responseBody)
};

export const Comments = {
    deleteCommment : (id: number) : Promise<void> => request.delete(`/${id}`)
}