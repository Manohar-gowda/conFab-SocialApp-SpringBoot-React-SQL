package com.confab.Social.DTO;

import com.confab.Social.Model.Likes;
import com.confab.Social.Model.User;

import java.util.ArrayList;
import java.util.List;

public class LikeDtoMapper {
    public static LikeDto toLikeDto(Likes like, User reqUser) {
        UserDto user = UserDtoMapper.toUserDto(like.getUser());
        UserDto reqUserDto = UserDtoMapper.toUserDto(reqUser);
        PostDto post = PostDtoMapper.toPostDto(like.getPost(),reqUser);

        LikeDto likeDto = new LikeDto();
        likeDto.setId(like.getId());
        likeDto.setPost(post);
        likeDto.setUser(user);

        return likeDto;
    }

    public static List<LikeDto> toLikeDtos(List<Likes> likes, User reqUser) {
        List<LikeDto> likeDtos = new ArrayList<>();

        for (Likes like : likes) {
            UserDto user = UserDtoMapper.toUserDto(like.getUser());
            PostDto post = PostDtoMapper.toPostDto(like.getPost(), reqUser);

            LikeDto likeDto = new LikeDto();
            likeDto.setId(like.getId());
            likeDto.setPost(post);
            likeDto.setUser(user);
            likeDtos.add(likeDto);
        }
        return likeDtos;
    }
}
