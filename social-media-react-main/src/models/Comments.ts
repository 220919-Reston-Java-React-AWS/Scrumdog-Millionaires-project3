export default class Comments{
    id: number;
    text: string;
    author: any;
    likes: number[];

    constructor (id: number, text:string,  author:any, likes:number[]) {
        this.id = id;
        this.text = text;
        this.author = author;
        this.likes = likes;
    }
}