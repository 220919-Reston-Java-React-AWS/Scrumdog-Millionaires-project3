package com.revature.controllers;

import com.revature.annotations.Authorized;
import com.revature.models.Post;
import com.revature.models.User;
import com.revature.services.PostService;
import com.revature.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.sql.Clob;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/profile")
@CrossOrigin(origins = {"http://travelogfe.s3-website-us-east-1.amazonaws.com", "http://localhost:3000"
}, allowCredentials = "true")
public class ProfileController {

    private final PostService postService;
    private final UserService userService;

    public ProfileController(PostService postService, UserService userService) {
        this.postService = postService;
        this.userService = userService;
    }

    @Authorized
    @GetMapping("{authorid}")
    public ResponseEntity<List<Post>> getAllPostsByUser(@PathVariable("authorid") int id, HttpSession session) {
        Optional<User> optional = userService.findById(id);

        if (!optional.isPresent()) {
            return ResponseEntity.badRequest().build();
        } else {
            User user = optional.get();
            session.setAttribute("user", optional.get());

            return ResponseEntity.ok(this.postService.getAllByAuthor(user));
        }
    }

    @Authorized
    @PutMapping("/about_me_up{currentuser}")
    public ResponseEntity<User> updateAboutMe( @PathVariable ("currentuser") int id, @RequestBody String aboutMe) {
        Optional<User> optional = userService.findById(id);
        if (!optional.isPresent()) {
            return ResponseEntity.badRequest().build();
        } else {
            User user = optional.get();
            user.setAboutMe(aboutMe);
            return ResponseEntity.ok(this.userService.save(user));
        }
    }

    @GetMapping("/about_me_get{authorid}")
    public ResponseEntity<String> getAboutMeUser(@PathVariable("authorid") int id, HttpSession session) {
        Optional<User> optional = userService.findById(id);

        if (!optional.isPresent()) {
            return ResponseEntity.badRequest().build();
        } else {
            User user = optional.get();
            session.setAttribute("user", optional.get());

            return ResponseEntity.ok(this.userService.getAboutMe(user));
        }
    }
}
