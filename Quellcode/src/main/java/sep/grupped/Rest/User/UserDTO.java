package sep.grupped.Rest.User;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
  private Long id;
  private String userName;
  private String firstName;
  private String lastName;
  private String password;
  private String email;
  private UserRole role;
  private String prfPicture;
  private String favData;

}
