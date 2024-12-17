package com.confab.Social.Services;

import com.confab.Social.Exceptions.PostException;
import com.confab.Social.Exceptions.UserException;
import com.confab.Social.Model.Post;
import com.confab.Social.Model.User;
import com.confab.Social.Repository.PostRepo;
import com.confab.Social.Requests.PostReplyRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PostServiceImpl implements PostService{

    @Autowired
    private PostRepo postRepo;

    @Override
    public Post createPost(Post req, User user) throws UserException {

        Post post = new Post();
        post.setContent(req.getContent());
        post.setCreatedAt(LocalDateTime.now());
        post.setImage(req.getImage());
        post.setUser(user);
        post.setReply(false);
        post.setPost(true);
        post.setVideo(req.getVideo());

        return  postRepo.save(post);
    }

    @Override
    public List<Post> findAllPost() {
        return postRepo.findAllByIsPostTrueOrderByCreatedAtDesc();
    }

    @Override
    public Post rePost(Long postId, User user) throws UserException, PostException {
        Post post = findById(postId);
        if(post.getRePostUser().contains(user)) {
            post.getRePostUser().remove(user);
        } else {
            post.getRePostUser().add(user);
        }
        return postRepo.save(post);
    }

    @Override
    public Post findById(Long postId) throws PostException {
        Post post = postRepo.findById(postId)
                .orElseThrow(() -> new PostException("Post not found with id " + postId));
        return post;
    }

    @Override
    public void deletePostById(Long postId, Long userId) throws PostException, UserException {
        Post post = findById(postId);
        if(userId.equals(post.getUser().getId())) {
            throw new UserException("You can't delete another users post");
        }

        postRepo.deleteById(post.getId());
    }

    @Override
    public Post removeFromrePost(Long postId, User user) throws PostException, UserException {

        return null;
    }

    @Override
    public Post createReply(PostReplyRequest req, User user) throws PostException {

        Post replyFor = findById(req.getPostId());

        Post post = new Post();
        post.setContent(req.getContent());
        post.setCreatedAt(LocalDateTime.now());
        post.setImage(req.getImage());
        post.setUser(user);
        post.setReply(true);
        post.setPost(false);
        post.setReplyFor(replyFor);

        Post savedReply = postRepo.save(post);
        replyFor.getReplyPost().add(savedReply);
        postRepo.save(replyFor);

        return replyFor;
    }

    @Override
    public List<Post> getUserPost(User user) {
        return postRepo.findByrePostUserContainsOrUserIdAndIsPostTrueOrderByCreatedAtDesc(user, user.getId());
    }

    @Override
    public List<Post> findByLikesContainsUser(User user) {
        return postRepo.findByLikesUserId(user.getId());
    }
}
