package com.confab.Social.Services;

import com.confab.Social.Exceptions.UserException;
import com.confab.Social.Model.User;

import java.util.List;

public interface UserService {

    public User findUserById(Long userId) throws UserException ;
    public User findUserProfileByJwt(String jwt) throws UserException;
    public User UpdateUser(Long userId, User user) throws UserException;
    public User followUnfollowUser(Long userId,User user) throws UserException;
    public List<User> searchUser(String query);

}
