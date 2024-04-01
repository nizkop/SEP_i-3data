package sep.grupped.Rest.chatbot;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


public class BotMessageResponse {
  private String response;

  public BotMessageResponse() {
  }

  public String getResponse() {
    return response;
  }

  public void setResponse(String response) {
    this.response = response;
  }
}
