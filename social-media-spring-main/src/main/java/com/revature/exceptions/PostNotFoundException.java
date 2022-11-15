package com.revature.exceptions;

public class PostNotFoundException extends RuntimeException {
    PostNotFoundException(int id){
        super("Post with id " + id + " was not found");
    }
}
