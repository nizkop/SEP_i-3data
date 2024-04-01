
package sep.grupped.Rest.chatbot;

import javax.persistence.*;

import lombok.*;
import sep.grupped.Rest.User.User;


@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ChatBotMessage {
 @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String content;

//  private String type;

  private String sender;

}

