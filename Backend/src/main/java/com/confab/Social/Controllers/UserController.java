package com.confab.Social.Controllers;


import com.confab.Social.DTO.UserDto;
import com.confab.Social.DTO.UserDtoMapper;
import com.confab.Social.Exceptions.UserException;
import com.confab.Social.Model.User;
import com.confab.Social.Services.UserService;
import com.confab.Social.Utils.UserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserDto> getUserProfile(@RequestHeader("Authorization") String jwt) throws UserException {

        User user = userService.findUserProfileByJwt(jwt);
        UserDto userDto = UserDtoMapper.toUserDto(user);

        userDto.setReq_user(true);

        return new ResponseEntity<UserDto>(userDto, HttpStatus.ACCEPTED);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long userId,
                                               @RequestHeader("Authorization") String jwt) throws UserException {

        User requser = userService.findUserProfileByJwt(jwt);

        User user = userService.findUserById(userId);
        UserDto userDto = UserDtoMapper.toUserDto(user);
        userDto.setReq_user(UserUtil.isReqUser(requser, user));
        userDto.setFollowed(UserUtil.isFollowedByReqUser(requser, user));

        return new ResponseEntity<UserDto>(userDto, HttpStatus.ACCEPTED);
    }

    @GetMapping("/search")
    public ResponseEntity<List <UserDto >> searchUser(@RequestParam String query,
                                              @RequestHeader("Authorization") String jwt) throws UserException {

        User requser = userService.findUserProfileByJwt(jwt);

        List<User> users = userService.searchUser(query);
        List<UserDto> userDtos = UserDtoMapper.toUserDtos(users);

        return new ResponseEntity<>(userDtos, HttpStatus.ACCEPTED);
    }

    @PutMapping("/update")
    public ResponseEntity<UserDto> updateUser(@RequestBody User req,
                                                      @RequestHeader("Authorization") String jwt) throws UserException {

        User requser = userService.findUserProfileByJwt(jwt);

        User user = userService.UpdateUser(requser.getId(), req);
        UserDto userDtos = UserDtoMapper.toUserDto(user);

        return new ResponseEntity<UserDto>(userDtos, HttpStatus.ACCEPTED);
    }

    @PutMapping("/{userId}/follow")
    public ResponseEntity<UserDto> followUser(@PathVariable Long userId,
                                              @RequestHeader("Authorization") String jwt) throws UserException {

        User requser = userService.findUserProfileByJwt(jwt);

        User user = userService.followUnfollowUser(userId, requser);
        UserDto userDto = UserDtoMapper.toUserDto(user);
        userDto.setFollowed(UserUtil.isFollowedByReqUser(requser, user));

        return new ResponseEntity<UserDto>(userDto, HttpStatus.ACCEPTED);
    }


    }
