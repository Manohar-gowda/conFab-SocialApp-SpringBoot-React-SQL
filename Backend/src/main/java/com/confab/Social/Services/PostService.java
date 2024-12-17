package com.confab.Social.Services;

import com.confab.Social.Exceptions.PostException;
import com.confab.Social.Exceptions.UserException;
import com.confab.Social.Model.Post;
import com.confab.Social.Model.User;
import com.confab.Social.Requests.PostReplyRequest;

import java.util.List;

public interface PostService {

    public Post createPost(Post req, User user) throws UserException;
    public List<Post> findAllPost();
    public Post rePost(Long postId, User user) throws UserException, PostException;
    public Post findById(Long postId) throws PostException;

    public void deletePostById(Long postId, Long userId) throws PostException, UserException;
    public Post removeFromrePost(Long postId, User user) throws PostException, UserException;

    public Post createReply(PostReplyRequest req, User user) throws PostException;

    public List<Post> getUserPost(User user);
    public List<Post> findByLikesContainsUser(User user);
}
