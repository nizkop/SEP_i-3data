package sep.grupped.Rest.User;

import lombok.*;
import java.util.*;

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
  private List<User> friends;
  private List<User> friendrequests;
  private Boolean friendsPrivate;
  private List<Long> favThreadIds;
  private List<Long> likedThreads;
  private String birthDate;
  private String selectedCharts;
  private Boolean profileViewPrivate;
}
