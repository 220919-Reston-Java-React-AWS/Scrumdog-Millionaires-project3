import Comments from "./Comments";

export default class Post {
    id: number;
    text: string;
    imageUrl: string;
    comments: Comments[];
    author: any;
    likes: number[];

    constructor (id: number, text:string, imageUrl:string, comments: Comments[], author:any, likes:number[]) {
        this.id = id;
        this.text = text;
        this.imageUrl = imageUrl;
        this.comments = comments;
        this.author = author;
        this.likes = likes;
    }
}