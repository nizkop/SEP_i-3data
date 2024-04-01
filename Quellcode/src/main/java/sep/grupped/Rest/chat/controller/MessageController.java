package sep.grupped.Rest.chat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sep.grupped.Rest.User.User;
import sep.grupped.Rest.User.UserRepository;
import sep.grupped.Rest.chat.model.ChatRoom;
import sep.grupped.Rest.chat.model.Message;
import sep.grupped.Rest.chat.repository.ChatRoomRepository;
import sep.grupped.Rest.chat.repository.MessageRepository;
import sep.grupped.Rest.chat.service.ChatRoomService;
import sep.grupped.Rest.chat.service.MessageService;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/chat")
@CrossOrigin(origins = "http://localhost:4200")
public class MessageController {

  @Autowired
  private MessageService messageService;

  @Autowired
  private ChatRoomService chatRoomService;

  @Autowired
  private ChatRoomRepository chatRoomRepository;
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private MessageRepository messageRepository;

  @PostMapping("/messages/send")
  public ResponseEntity<?> postMessage(@RequestBody Message message) {
    Optional<ChatRoom> chatRoom = chatRoomRepository.findById(message.getChatRoom().getId());
    Optional<User> sender = userRepository.findById(message.getSender().getId());

    if (chatRoom.isPresent() && sender.isPresent()) {
      message.setChatRoom(chatRoom.get());
      message.setSender(sender.get());

      Message savedMessage = messageService.saveMessage(message);
      chatRoom.get().getMessages().add(savedMessage);

      return ResponseEntity.ok(savedMessage);
    }

    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
      .body("The chat room or sender associated with the message does not exist");
  }
  @PostMapping("/chatrooms/users/{userId}/getChatRooms")
  public ResponseEntity<List<ChatRoom>> getUserChatRoom(@PathVariable Long userId){
    List<ChatRoom> chatRooms = chatRoomRepository.findByUserId(userId);
    return ResponseEntity.ok(chatRooms);
  }
  @GetMapping("/chatrooms/{chatroomId}/messages")
  public List<Message> getChatRoomMessages(@PathVariable Long chatroomId) {
    return messageService.getChatRoomMessages(chatroomId);
  }
  @GetMapping("/chatrooms/{chatroomId}/messages/new")
  public List<Message> getNewMessages(@PathVariable Long chatroomId, @RequestParam Long lastMessageId) {
    return messageService.getNewMessages(chatroomId, lastMessageId);
  }
  @PostMapping("/chatrooms/{chatroomId}/users/{userId}")
  public ChatRoom addUserToChatRoom(@PathVariable Long chatroomId, @PathVariable Long userId) {
    return chatRoomService.addUserToChatRoom(chatroomId, userId);
  }
  @PutMapping("/chatrooms/messages/{messageId}/update")
  public ResponseEntity<?> updateMessage( @PathVariable Long messageId, @RequestBody Message message){
    Optional<Message> tempmessage = messageRepository.findById(messageId);
    if(tempmessage.isPresent()){
      if(!tempmessage.get().isRead()){
        Message msg = tempmessage.get();
        msg.setPayload(message.getPayload());
        return ResponseEntity.ok(messageRepository.save(msg));
      }
      else{
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("This message has been read already. Can't update");
      }
    }
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("The message with ID " + messageId + " does not exist.");
  }
  @DeleteMapping("/chatrooms/messages/{messageId}/delete")
  public ResponseEntity<?> deleteMessage(@PathVariable Long messageId){
    Optional<Message> toBeDeleted = messageRepository.findById(messageId);
    if (toBeDeleted.isPresent()){
      if(!toBeDeleted.get().isRead()){
        messageRepository.deleteById(messageId);
        return ResponseEntity.status(HttpStatus.OK).body("The message with ID " + messageId + " was deleted successfully");
      }
      else{
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("This message has been read already. Can't delete");
      }
    }
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("The message with ID " + messageId + " does not exist.");
  }


  @PostMapping("/chatrooms/create")
  public ResponseEntity<ChatRoom> createChatRoom(@RequestBody ChatRoom chatRoom) {
    ChatRoom savedChatRoom = chatRoomRepository.save(chatRoom);
    return new ResponseEntity<>(savedChatRoom, HttpStatus.CREATED);
  }
  @PutMapping("/chatrooms/{chatroomId}/updateName")
  public ResponseEntity<?> updateMessage( @PathVariable Long chatroomId, @RequestBody ChatRoom chatRoom){
    Optional<ChatRoom> tempchat = chatRoomRepository.findById(chatroomId);
    if(tempchat.isPresent()){
        ChatRoom chatroomtemp = tempchat.get();
        chatroomtemp.setName(chatRoom.getName());
        return ResponseEntity.ok(chatRoomRepository.save(chatroomtemp));
    }
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("The Chatroom with ID " + chatroomId + " does not exist.");
  }
  @DeleteMapping("/chatrooms/{chatroomId}/delete")
  public ResponseEntity<?> deleteChatRoom(@PathVariable Long chatroomId){
    Optional<ChatRoom> toBeDeleted = chatRoomRepository.findById(chatroomId);
    if (toBeDeleted.isPresent()){
        chatRoomRepository.deleteById(chatroomId);
        return ResponseEntity.status(HttpStatus.OK).body("The Chatroom with ID " + chatroomId + " was deleted successfully");
      }
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("The Chatroom with ID " + chatroomId + " does not exist.");
  }
  @GetMapping("/chatrooms/get-all")
  public List<ChatRoom> getAllChatRooms() {
    return chatRoomService.getAllChatRooms();
  }

  @PostMapping("/chatrooms/messages/{messageId}/isRead")
  public ResponseEntity<?> markMessageAsRead(@PathVariable Long messageId) {
    Optional<Message> optionalMessage = messageRepository.findById(messageId);

    if (optionalMessage.isPresent()) {
      Message message = optionalMessage.get();
      message.setRead(true);
      messageService.saveMessage(message);
      return ResponseEntity.ok().build();
    }

    return ResponseEntity.status(HttpStatus.NOT_FOUND)
      .body("The message with ID " + messageId + " does not exist");
  }
  @GetMapping("/chatrooms/messages/{messageId}/getMessage")
  public Message getMessageById(@PathVariable Long messageId){
    return messageRepository.findById(messageId).orElse(null);
  }
}
