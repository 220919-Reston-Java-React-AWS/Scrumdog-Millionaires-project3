export default class Comments{
    id: number;
    text: string;
    author: any;
    post: any;

    constructor (id: number, text:string,  author:any, post:any) {
        this.id = id;
        this.text = text;
        this.author = author;
        this.post = post;
        
    }
}