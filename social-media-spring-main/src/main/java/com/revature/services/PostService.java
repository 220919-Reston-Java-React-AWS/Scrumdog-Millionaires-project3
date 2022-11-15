package com.revature.services;

import com.google.common.primitives.Ints;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import com.revature.models.Likes;
import com.revature.models.User;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.revature.models.Post;
import com.revature.repositories.PostRepository;
import org.springframework.web.server.ResponseStatusException;

@Service
public class PostService {

	private PostRepository postRepository;
	private UserService userService;
	
	public PostService(PostRepository postRepository) {
		this.postRepository = postRepository;
	}

	public List<Post> getAll() {
		return this.postRepository.findAll();
	}

	public List<Post> getAllByAuthor(User user){

			return this.postRepository.findPostByAuthor(user);

		}

	public Post upsert(Post post) {
		return this.postRepository.save(post);
	}

	public ResponseObjectService updatePostByLike(Likes likesId){

		// create response object
		ResponseObjectService responseObj = new ResponseObjectService();
		// get post by id if exsists
		Optional<Post> optPost = postRepository.findById(likesId.getPost_id());
		//create conditional based on whether it does
		if(optPost.isEmpty()){
			//create a response if the post doesnt exsist
			responseObj.setStatus("Fail");
			responseObj.setMessage("Cannot find post id: " + likesId.getPost_id());
			responseObj.setPayload(null);
		} else {
			// if it does exist, grab post and grab its list of likes
			Post targetPost = optPost.get();
			List<Integer> likeList = targetPost.getLikes();
			// if the like list is empty, create one
			if(likeList == null){
				likeList = new ArrayList<>();
			}
			//now determine if we will add or subtract a like
			//check whether or not the post like has a user associated with it
			//if it doesnt, add the user, if it does, remove it
//			int[] arr = likeList.stream().mapToInt(i -> i).toArray();
			if(!likeList.contains(likesId.getUser_id())){
				likeList.add(likesId.getUser_id());
			} else {
				likeList.remove(Integer.valueOf(likesId.getUser_id()));
			}
			//update the like list and update the repository
			targetPost.setLikes(likeList);
			postRepository.save(targetPost);
			//display message via response object
			responseObj.setStatus("Success");
			responseObj.setMessage("Update like to the target post with id: " + targetPost.getId());
			responseObj.setPayload(targetPost);
		}
		return responseObj;
	}
}
