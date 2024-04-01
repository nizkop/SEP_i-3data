package sep.grupped.Rest.chatbot;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatBotRepository extends JpaRepository<ChatBotMessage,Long> {

}
