package sep.grupped.Rest.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sep.grupped.Rest.chat.model.ChatRoom;

import java.util.List;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
  @Query("SELECT cr FROM ChatRoom cr JOIN cr.users u WHERE u.id = :userId")
  List<ChatRoom> findByUserId(@Param("userId") Long userId);
}
