package sep.grupped.Rest.forum;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ThreadRepository extends JpaRepository<forumThread, Long> {

}
