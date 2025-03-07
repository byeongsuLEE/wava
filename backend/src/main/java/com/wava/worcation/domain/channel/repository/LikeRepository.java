package com.wava.worcation.domain.channel.repository;

import com.wava.worcation.domain.channel.domain.Feed;
import com.wava.worcation.domain.channel.domain.Like;
import com.wava.worcation.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long>  {
    Optional<Like>  findByUserAndFeed(User user, Feed feed);
    boolean existsByUserAndFeed(User user, Feed feed);
    boolean existsByUserAndFeedId(User user, Long feedId);
    int countByFeed(Feed feed);
}
