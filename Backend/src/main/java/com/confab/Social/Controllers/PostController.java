package com.confab.Social.Controllers;

import com.confab.Social.DTO.PostDto;
import com.confab.Social.DTO.PostDtoMapper;
import com.confab.Social.Exceptions.PostException;
import com.confab.Social.Exceptions.UserException;
import com.confab.Social.Model.Post;
import com.confab.Social.Model.User;
import com.confab.Social.Requests.PostReplyRequest;
import com.confab.Social.Responses.ApiResponse;
import com.confab.Social.Services.PostService;
import com.confab.Social.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<PostDto> createPost(@RequestBody Post req,
                                              @RequestHeader("Authorization") String jwt) throws UserException, PostException {
        User user = userService.findUserProfileByJwt(jwt);

        Post post = postService.createPost(req, user);

        PostDto postDto = PostDtoMapper.toPostDto(post, user);
        return new ResponseEntity<>(postDto, HttpStatus.CREATED);
    }

    @PostMapping("/reply")
    public ResponseEntity<PostDto> replyPost(@RequestBody PostReplyRequest req,
                                              @RequestHeader("Authorization") String jwt) throws UserException, PostException {
        User user = userService.findUserProfileByJwt(jwt);

        Post post = postService.createReply(req, user);

        PostDto postDto = PostDtoMapper.toPostDto(post, user);
        return new ResponseEntity<>(postDto, HttpStatus.CREATED);
    }

    @PutMapping("/{postId}/repost")
    public ResponseEntity<PostDto> rePost(@PathVariable Long postId,
                                          @RequestHeader("Authorization") String jwt) throws UserException, PostException {
        User user = userService.findUserProfileByJwt(jwt);

        Post post = postService.rePost(postId, user);

        PostDto postDto = PostDtoMapper.toPostDto(post, user);
        return new ResponseEntity<>(postDto, HttpStatus.OK);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<PostDto> findPostById(@PathVariable Long postId,
                                          @RequestHeader("Authorization") String jwt) throws UserException, PostException {
        User user = userService.findUserProfileByJwt(jwt);

        Post post = postService.findById(postId);

        PostDto postDto = PostDtoMapper.toPostDto(post, user);
        return new ResponseEntity<>(postDto, HttpStatus.OK);
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<ApiResponse> deletePost(@PathVariable Long postId,
                                          @RequestHeader("Authorization") String jwt) throws UserException, PostException {
        User user = userService.findUserProfileByJwt(jwt);

        postService.deletePostById(postId, user.getId());

        ApiResponse response = new ApiResponse("Post deleted successfully", true);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<List<PostDto>> getAllPosts(
                                                    @RequestHeader("Authorization") String jwt) throws UserException, PostException {
        User user = userService.findUserProfileByJwt(jwt);

        List<Post> posts = postService.findAllPost();
        List<PostDto> postDtos = PostDtoMapper.toPostDtos(posts, user);

        return new ResponseEntity<>(postDtos, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PostDto>> getUsersAllPosts(@PathVariable Long userId,
                                                     @RequestHeader("Authorization") String jwt) throws UserException, PostException {
        User user = userService.findUserProfileByJwt(jwt);

        List<Post> posts = postService.getUserPost(user);
        List<PostDto> postDtos = PostDtoMapper.toPostDtos(posts, user);

        return new ResponseEntity<>(postDtos, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}/likes")
    public ResponseEntity<List<PostDto>> findPostByLikesContainsUser(@PathVariable Long userId,
                                                          @RequestHeader("Authorization") String jwt) throws UserException, PostException {
        User user = userService.findUserProfileByJwt(jwt);

        List<Post> posts = postService.findByLikesContainsUser(user);
        List<PostDto> postDtos = PostDtoMapper.toPostDtos(posts, user);

        return new ResponseEntity<>(postDtos, HttpStatus.OK);
    }


}
