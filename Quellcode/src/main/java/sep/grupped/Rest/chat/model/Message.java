package sep.grupped.Rest.chat.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;
import sep.grupped.Rest.User.User;

import javax.persistence.*;
import java.util.Date;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "messages")
@JsonIdentityInfo(
  generator = ObjectIdGenerators.PropertyGenerator.class,
  property = "id")
public class Message {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  private String payload;

  @ManyToOne
  @JoinColumn(name="sender_id", nullable=false)
  private User sender;

  @ManyToOne
  @JoinColumn(name="chatroom_id", nullable=false)
  private ChatRoom chatRoom;


  private boolean read;

  @Enumerated(EnumType.STRING)
  private Type type;
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSZ", timezone = "UTC")
  private Date createdAt;
}
