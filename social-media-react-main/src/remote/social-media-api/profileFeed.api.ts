import { useContext } from "react";
import internal from "stream";
import AboutMe from "../../components/user-profile/subpages/AboutMe";
import { UserContext } from "../../context/user.context";
import Post from "../../models/Post";
import socialClient, { socialApiResponse } from "./socialClient";

const baseURL = "/profile"

// const { user } = useContext(UserContext);

export const apiGetAllPostsByUser = async (authorid: number): Promise<socialApiResponse> => {
     
    const response = await socialClient.get<any>(
        `${baseURL}/${authorid}`
    );
    // console.log(response.data)
    return { status: response.status, payload: response.data };
}

export const apiUpdateAboutMe = async (currentuser: number, aboutme: string): Promise <socialApiResponse> =>{
    const response = await socialClient.put<any>(
        `${baseURL}/about_me_up${currentuser}`,aboutme
    );
    return {status: response.status, payload: response.data};
}
export const apiGetAboutMe = async (currentuser: number): Promise <socialApiResponse> =>{
    const response = await socialClient.get<any>(
        `${baseURL}/about_me_get${currentuser}`
    );
    return {status: response.status, payload: response.data};
}