import socialClient, { socialApiResponse } from "./socialClient";

const baseURL = "/comments";

// export const apiGetComments = async (): Promise<socialApiResponse> => {
//     const response = await socialClient.get<any>(
//         baseURL
//     );
//     return { status: response.status, payload: response.data }
// }

export const apiUpsertComment = async (comment: any): Promise<socialApiResponse> => {
    const response = await socialClient.post<any>(baseURL, comment, {withCredentials: true});
    return { status: response.status, payload: response.data };
}

export const apiGetAllCommentsByPost = async (postid: number): Promise<socialApiResponse> => {
     
    const response = await socialClient.get<any>(
        `${baseURL}/${postid}`
    );
    // console.log(response.data)
    return { status: response.status, payload: response.data };
}