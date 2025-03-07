package com.wava.worcation.domain.channel.repository;

import com.wava.worcation.domain.channel.domain.Channel;
import com.wava.worcation.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChannelRepository extends JpaRepository<Channel, Long> {
    Optional<Channel> findById(Long id);

    @Query("select c from Channel c where c.user.id = :userId and c.channelType='C002'  ")
    Channel findChannelByUserId (@Param("userId") long userId);

    List<Object> findByUserId(long userId);
    List<Channel> findByChannelType(String channelType);

    @Query("SELECT c FROM Channel c WHERE c.channelType = :channelType ORDER BY CASE WHEN c.channelSido = :sido THEN 0 ELSE 1 END, c.channelTitle ASC")
    List<Channel> findAllByChannelType(@Param("channelType")String channelType, @Param("sido") String sido);

    @Query("SELECT c FROM Channel c " +
            "WHERE c.channelType = :channelType " +
            "AND (LOWER(c.channelTitle) LIKE LOWER(CONCAT('%', :content, '%')) OR LOWER(c.channelDescription) LIKE LOWER(CONCAT('%', :content, '%'))) " +
            "ORDER BY CASE " +
            "    WHEN c.channelSido = :sido THEN 0 " +
            "    ELSE 1 " +
            "END, c.channelTitle ASC")
    List<Channel> searchChannelByInsert(
            @Param("content") String content,
            @Param("channelType") String channelType,
            @Param("sido") String sido);


    Optional<Channel> findByUserAndChannelType(User user, String channelType);
}
