package com.revature.services;

import com.revature.models.Comments;
import com.revature.models.Post;
import com.revature.repositories.CommentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CommentsService {

    @Autowired
    private CommentsRepository commentsRepository;
    private PostService postService;

    public List<Comments> getAllByPostId(Post post){
            return this.commentsRepository.findCommentByPost(post);
    }

    public Comments upsert(Comments comment) {
        return this.commentsRepository.save(comment);
    }

//    public static ResponseObjectService updateCommentByLike(CommentLikes likesId){
//
//        // create response object
//        ResponseObjectService responseObj = new ResponseObjectService();
//        // get post by id if exsists
//        Optional<Comments> optComment = commentsRepository.findById(likesId.getComment_id());
//        //create conditional based on whether it does
//        if(optComment.isEmpty()){
//            //create a response if the post doesn't exist
//            responseObj.setStatus("Fail");
//            responseObj.setMessage("Cannot find post id: " + likesId.getComment_id());
//            responseObj.setPayload(null);
//        } else {
//            // if it does exist, grab post and grab its list of likes
//            Comments targetComment = optComment.get();
//            List<Integer> likeList = targetComment.getCommentLikes();
//            // if the like list is empty, create one
//            if(likeList == null){
//                likeList = new ArrayList<>();
//            }
//            //now determine if we will add or subtract a like
//            //check whether or not the post like has a user associated with it
//            //if it doesnt, add the user, if it does, remove it
////			int[] arr = likeList.stream().mapToInt(i -> i).toArray();
//            if(!likeList.contains(likesId.getUser_id())){
//                likeList.add(likesId.getUser_id());
//            } else {
//                likeList.remove(Integer.valueOf(likesId.getUser_id()));
//            }
//            //update the like list and update the repository
//            targetComment.setCommentLikes(likeList);
//            commentsRepository.save(targetComment);
//            //display message via response object
//            responseObj.setStatus("Success");
//            responseObj.setMessage("Update like to the target post with id: " + targetComment.getId());
//            responseObj.setPayload(targetComment);
//        }
//        return responseObj;
//    }

}
