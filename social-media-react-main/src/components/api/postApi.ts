import axios, {AxiosResponse} from "axios";
import {ILikes} from "../../models/LikesModel";
import Post from "../../models/Post";

const instance = axios.create({
    baseURL: "http://travelog-env-1.eba-edcjcgpw.us-east-1.elasticbeanstalk.com/",
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

export const DeletePost = {
	deletePost: (id:number) : Promise<void> => requests.delete(`/${id}`)
}

export const updatePost = {
	updatePost: (post: Post, id:number): Promise<Post> => requests.put(`/edit/${id}`, post)
}