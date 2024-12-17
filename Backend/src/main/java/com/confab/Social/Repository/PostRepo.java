package com.confab.Social.Repository;

import com.confab.Social.Model.Post;
import com.confab.Social.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepo extends JpaRepository<Post, Long> {

    List<Post> findAllByIsPostTrueOrderByCreatedAtDesc();

    List<Post> findByrePostUserContainsOrUserIdAndIsPostTrueOrderByCreatedAtDesc(User user, Long userId);

    List<Post> findByLikesContainingOrderByCreatedAtDesc(User user);

    @Query("SELECT p FROM Post p JOIN p.likes l WHERE l.user.id = :userId")
    List<Post> findByLikesUserId(@Param("userId") Long userId);
}