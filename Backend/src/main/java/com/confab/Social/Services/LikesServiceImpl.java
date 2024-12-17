package com.confab.Social.Services;

import com.confab.Social.Exceptions.PostException;
import com.confab.Social.Exceptions.UserException;
import com.confab.Social.Model.Likes;
import com.confab.Social.Model.Post;
import com.confab.Social.Model.User;
import com.confab.Social.Repository.LikeRepo;
import com.confab.Social.Repository.PostRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LikesServiceImpl implements LikeService{

    @Autowired
    private LikeRepo likeRepo;
    @Autowired
    private PostService postService;
    @Autowired
    private PostRepo postRepo;

    @Override
    public Likes likePost(Long postId, User user) throws UserException, PostException {
        Likes isLikeExists = likeRepo.isLikeExists(user.getId(), postId);

        if(isLikeExists != null) {
            likeRepo.deleteById(isLikeExists.getId());
            return isLikeExists;
        }
        Post post = postService.findById(postId);
        Likes like = new Likes();
        like.setUser(user);
        like.setPost(post);

        Likes savedLike = likeRepo.save(like);

        post.getLikes().add(savedLike);
        postRepo.save(post);
        return savedLike;
    }

    @Override
    public List<Likes> getAllLikes(Long postId) throws PostException {
        Post post = postService.findById(postId);

        return likeRepo.findByPostId(postId);
    }
}
