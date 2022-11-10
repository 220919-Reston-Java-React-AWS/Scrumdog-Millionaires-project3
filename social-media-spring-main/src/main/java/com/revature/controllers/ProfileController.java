package com.revature.controllers;

import com.revature.annotations.Authorized;
import com.revature.models.Post;
import com.revature.models.User;
import com.revature.services.PostService;
import com.revature.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/profile")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"}, allowCredentials = "true")
public class ProfileController {

    private final PostService postService;
    private final UserService userService;

    public ProfileController(PostService postService, UserService userService) {
        this.postService = postService;
        this.userService = userService;
    }

    @Authorized
    @GetMapping("{authorid}")
    public ResponseEntity<List<Post>> getAllPostsByUser(@PathVariable("authorid") int id,  HttpSession session) {
        System.out.println("Profile COnt");
        Optional<User> optional = userService.findById(id);

        if(!optional.isPresent()) {
            return ResponseEntity.badRequest().build();
        }else{
            User user = optional.get();
            session.setAttribute("user", optional.get());

            return ResponseEntity.ok(this.postService.getAllByAuthor(user));
        }



//        return ResponseEntity.ok(this.postService.getAllByAuthor(id));
    }
}