package com.revature.services;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

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
		System.out.println("GetbyAuthor");

			return this.postRepository.findPostByAuthor(user);

		}

	public Post upsert(Post post) {
		return this.postRepository.save(post);
	}

	public int increaseLikeCount(){return this.postRepository.increaseLikeCount();}
//	public int decreaseLikeCount(){return this.postRepository.decreaseLikeCount();}
}
