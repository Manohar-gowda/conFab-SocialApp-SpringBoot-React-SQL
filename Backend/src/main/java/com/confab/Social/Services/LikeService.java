package com.confab.Social.Services;

import com.confab.Social.Exceptions.PostException;
import com.confab.Social.Exceptions.UserException;
import com.confab.Social.Model.Likes;
import com.confab.Social.Model.User;

import java.awt.*;
import java.util.List;

public interface LikeService {

    public Likes likePost(Long postId, User user) throws UserException, PostException;
    public List<Likes> getAllLikes(Long postId) throws PostException;
}
