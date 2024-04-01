package sep.grupped.Rest.chat.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sep.grupped.Rest.chat.model.Message;
import sep.grupped.Rest.chat.repository.MessageRepository;

import java.util.Collections;
import java.util.List;

@Service
public class MessageService {
  @Autowired
  private MessageRepository messageRepository;

  public Message saveMessage(Message message) {
    return messageRepository.save(message);
  }

  public List<Message> getNewMessages(Long chatRoomId, Long lastMessageId) {
    if (lastMessageId == null) {
      return Collections.emptyList();
    }
    return messageRepository.findByChatRoomIdAndIdGreaterThan(chatRoomId, lastMessageId);
  }

  public List<Message> getChatRoomMessages(Long chatroomId) {
    return messageRepository.findByChatRoomIdOrderByCreatedAtDesc(chatroomId);
  }
}
