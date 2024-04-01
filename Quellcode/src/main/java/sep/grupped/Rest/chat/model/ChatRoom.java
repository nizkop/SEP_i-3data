package sep.grupped.Rest.chat.model;

import com.fasterxml.jackson.annotation.*;
import lombok.Getter;
import lombok.Setter;
import sep.grupped.Rest.User.User;

import javax.persistence.*;
import java.util.List;
@Getter
@Setter
@Entity
@Table(name = "ChatRoom")
@JsonIdentityInfo(
  generator = ObjectIdGenerators.PropertyGenerator.class,
  property = "id")
public class ChatRoom {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  private String name;
  @ManyToMany
  @JoinTable(
    name = "chatroom_user",
    joinColumns = @JoinColumn(name = "chatroom_id"),
    inverseJoinColumns = @JoinColumn(name = "user_id"))
  @JsonIdentityReference(alwaysAsId = true)
  private List<User> users;

  @OneToMany(mappedBy = "chatRoom")
  @JsonIdentityReference(alwaysAsId = true)
  private List<Message> messages;

}
