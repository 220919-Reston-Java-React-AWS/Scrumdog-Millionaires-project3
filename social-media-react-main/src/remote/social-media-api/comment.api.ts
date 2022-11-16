import socialClient, { socialApiResponse } from "./socialClient";

const baseURL = "/comments";

// export const apiGetComments = async (): Promise<socialApiResponse> => {
//     const response = await socialClient.get<any>(
//         baseURL
//     );
//     return { status: response.status, payload: response.data }
// }

export const apiUpsertComment = async (comment: any): Promise<socialApiResponse> => {
    const response = await socialClient.put<any>(baseURL, comment, {withCredentials: true});
    return { status: response.status, payload: response.data };
}