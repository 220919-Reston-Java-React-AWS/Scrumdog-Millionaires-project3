import axios, {AxiosResponse} from "axios";
import {ILikes} from "../../models/LikesModel";

const instance = axios.create({
    baseURL: "http://localhost:8080/post",
    timeout: 15000,
  });

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
	get: (url: string) => instance.get(url).then(responseBody),
	post: (url: string, body: {}) => instance.post(url, body).then(responseBody),
	put: (url: string, body: {}) => instance.put(url, body).then(responseBody),
	delete: (url: string) => instance.delete(url).then(responseBody),
};


export const Likes = {
	likeUnlikPost: (likes: ILikes): Promise<ILikes> => requests.post('/likepost', likes)
};