package sep.grupped.Rest.chatbot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chat-bot")
@CrossOrigin(origins = "http://localhost:4200")
public class ChatBotController {

  private ChatBotService chatBotService;

  @Autowired
  public ChatBotController(ChatBotService chatBotService) {
    this.chatBotService = chatBotService;
  }


  @PostMapping("/chatWithBot")
  public BotMessageResponse chatWithBot(@RequestBody UserMessageRequest userMessageRequest) {
    return chatBotService.processUserMessage(userMessageRequest);
  }


}
