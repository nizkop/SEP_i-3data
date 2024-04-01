package sep.grupped.Rest.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sep.grupped.Rest.chat.model.Message;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

  @Query("SELECT m FROM Message m WHERE m.chatRoom.id = :chatRoomId AND m.id > :messageId")
  List<Message>  findByChatRoomIdAndIdGreaterThan(@Param("chatRoomId") Long chatRoomId, @Param("messageId") Long messageId);

  List<Message> findByChatRoomIdOrderByCreatedAtDesc(Long chatroomId);
}
