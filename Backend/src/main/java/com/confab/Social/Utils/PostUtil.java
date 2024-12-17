package com.confab.Social.Utils;

import com.confab.Social.Model.Likes;
import com.confab.Social.Model.Post;
import com.confab.Social.Model.User;

public class PostUtil {
    public final static boolean isLikedByReqUser(User reqUser, Post post) {
        for(Likes likes: post.getLikes()) {
            if (likes.getUser().getId().equals(reqUser.getId())) {
                return true;
            }
        }
        return false;
    }

    public final static boolean isRePostedByReqUser(User reqUser, Post post) {
        for(User user : post.getRePostUser()) {
            if(user.getId().equals(reqUser.getId())) {
                return true;
            }
        }
        return false;
    }
}
