package com.revature;


import com.revature.models.Comments;
import com.revature.models.Post;
import com.revature.models.User;
import com.revature.repositories.CommentsRepository;
import com.revature.repositories.PostRepository;
import com.revature.repositories.UserRepository;
import com.revature.services.CommentsService;
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
public class CommentsServiceTest {


    @Mock
    private User user1;

    @Mock
    private Post post1;

    @Mock
    private CommentsRepository commentsRepository;

    @Mock
    private PostRepository postRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private CommentsService commentsService;

    @Test
    public void testCommentGrab(){
        Comments newcomment = new Comments(1, "hello",user1, post1);
        List<Comments> expected = new ArrayList<Comments>();
        expected.add(newcomment);

        Mockito.when(commentsService.getAllByPostId(post1)).thenReturn(expected);
        List<Comments> actual = commentsService.getAllByPostId(post1);

        Assertions.assertEquals(expected, actual);
    }



}
