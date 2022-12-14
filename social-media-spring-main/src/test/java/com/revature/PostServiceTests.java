package com.revature;

import com.revature.models.Post;
import com.revature.models.User;
import com.revature.repositories.PostRepository;
import com.revature.repositories.UserRepository;
import com.revature.services.PostService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class PostServiceTests {

    @Mock
    private User user1;


    @Mock
    private Post post1;

//    @Mock
//    private

    @Mock
    private PostRepository postRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private PostService postService;


    @Test
    public void testPostGrab(){
        Post newpost = new Post(1, "hello",null, null, null, null, user1);
        List<Post> expected = new ArrayList<Post>();
        expected.add(newpost);

        Mockito.when(postService.getAllByAuthor(user1)).thenReturn(expected);
        List<Post> actual = postService.getAllByAuthor(user1);

        Assertions.assertEquals(expected, actual);
    }

    @Test
    public void testPostGrabId(){
//        Post newpost = new Post(1, "hello",null, null, null, null, user1);
        Optional<Post> expected = Optional.of(post1);




        Mockito.when(postService.findById(post1.getId())).thenReturn(Optional.of(post1));
        Optional<Post> actual = postService.findById(post1.getId());

        Assertions.assertEquals(expected, actual);
    }




}
