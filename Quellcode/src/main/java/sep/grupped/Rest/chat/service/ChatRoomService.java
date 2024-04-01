package sep.grupped.Rest.chat.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sep.grupped.Rest.User.User;
import sep.grupped.Rest.User.UserRepository;
import sep.grupped.Rest.chat.exceptions.ResourceNotFoundException;
import sep.grupped.Rest.chat.model.ChatRoom;
import sep.grupped.Rest.chat.model.Message;
import sep.grupped.Rest.chat.repository.ChatRoomRepository;
import sep.grupped.Rest.chat.repository.MessageRepository;

import java.util.List;

@Service
public class ChatRoomService {

  @Autowired
  private ChatRoomRepository chatRoomRepository;

  @Autowired
  private UserRepository userRepository;

  public ChatRoom addUserToChatRoom(Long chatroomId, Long userId) {
    ChatRoom chatRoom = chatRoomRepository.findById(chatroomId).orElseThrow(() -> new ResourceNotFoundException("ChatRoom not found"));
    User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));

    chatRoom.getUsers().add(user);
    return chatRoomRepository.save(chatRoom);
  }
  public List<ChatRoom> getAllChatRooms(){
    return (List<ChatRoom>) chatRoomRepository.findAll();
  }
}
