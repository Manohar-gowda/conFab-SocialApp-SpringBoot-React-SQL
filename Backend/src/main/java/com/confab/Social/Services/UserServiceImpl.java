package com.confab.Social.Services;

import com.confab.Social.Config.JwtProvider;
import com.confab.Social.Exceptions.UserException;
import com.confab.Social.Model.User;
import com.confab.Social.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JwtProvider jwtProvider;

    @Override
    public User findUserById(Long userId) throws UserException {
        User user = userRepo.findById(userId).orElseThrow(()->new UserException("user not found with id " + userId));
        return user;
    }

    @Override
    public User findUserProfileByJwt(String jwt) throws UserException {
        String email = jwtProvider.getEmailFromToken(jwt);
        User user = userRepo.findByEmail(email);
        if(user == null) {
            throw new UserException("user not found with email " + email);
        }
        return user;
    }

    @Override
    public User UpdateUser(Long userId, User req) throws UserException {
        User user = findUserById(userId);

        if(req.getFullName() != null) {
            user.setFullName(req.getFullName());
        }

        if(req.getImage() != null) {
            user.setImage(req.getImage());
        }

        if(req.getBackgroundImage() != null) {
            user.setBackgroundImage(req.getBackgroundImage());
        }

        if(req.getBirthDate() != null) {
            user.setBirthDate(req.getBirthDate());
        }

        if(req.getLocation() != null) {
            user.setLocation(req.getLocation());
        }

        if(req.getBio() != null) {
            user.setBio(req.getBio());
        }

        if(req.getWebsite() != null) {
            user.setWebsite(req.getWebsite());
        }

        return userRepo.save(user);
    }

    @Override
    public User followUnfollowUser(Long userId, User user) throws UserException {
        User followToUser = findUserById(userId);

        if(user.getFollowings().contains(followToUser) && followToUser.getFollowers().contains(user)) {
            user.getFollowings().remove(followToUser);
            followToUser.getFollowers().remove(user);
        }else {
            user.getFollowings().add(followToUser);
            followToUser.getFollowers().add(user);
        }

        userRepo.save(followToUser);
        userRepo.save(user);
        return followToUser;
    }

    @Override
    public List<User> searchUser(String query) {
        return userRepo.searchUser(query);
    }
}
