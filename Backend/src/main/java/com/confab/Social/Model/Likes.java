package com.confab.Social.Model;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Likes {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Post post;

}
