export default class Post {
    id: number;
    text: string;
    imageUrl: string;
    comments: Post[];
    author: any;
    // likes: number;

    constructor (id: number, text:string, imageUrl:string, comments: Post[], author:any) {
        this.id = id;
        this.text = text;
        this.imageUrl = imageUrl;
        this.comments = comments;
        this.author = author;
        // this.likes = likes;
    }
}