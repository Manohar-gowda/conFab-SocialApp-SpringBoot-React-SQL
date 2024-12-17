package com.confab.Social.Repository;

import com.confab.Social.Model.Likes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikeRepo extends JpaRepository<Likes, Long> {

    @Query("SELECT l FROM Likes l WHERE l.user.id = :userId AND l.post.id = :postId")
    public Likes isLikeExists(@Param("userId") Long userId, @Param("postId") Long postId);

    @Query("SELECT l from Likes l WHERE l.post.id=:postId")
    public List<Likes> findByPostId(@Param("postId") Long postId);

}
