package com.confab.Social.Model;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private User user;

    private String content;
    private String image;
    private String video;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<Likes> likes = new ArrayList<>();

    @OneToMany
    private List<Post> replyPost = new ArrayList<>();

    @ManyToMany
    private List<User> rePostUser = new ArrayList<>();

    @ManyToOne
    private Post replyFor;

    private boolean isReply;
    private boolean isPost;

    private LocalDateTime createdAt;


}
