import { useContext } from "react";
import internal from "stream";
import { UserContext } from "../../context/user.context";
import Post from "../../models/Post";
import socialClient, { socialApiResponse } from "./socialClient";

const baseURL = "/profile"

// const { user } = useContext(UserContext);

export const apiGetAllPostsByUser = async (authorid: number): Promise<socialApiResponse> => {
     
    const response = await socialClient.get<any>(
        `${baseURL}/${authorid}`
    );
    console.log(response.data)
    return { status: response.status, payload: response.data };
}