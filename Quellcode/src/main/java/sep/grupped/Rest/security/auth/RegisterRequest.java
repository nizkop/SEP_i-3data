package sep.grupped.Rest.security.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import sep.grupped.Rest.User.UserRole;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

  private String firstName;
  private String lastName;
  private String email;
  private String password;
  private String birthDate;
  private UserRole role;
  private String userName;
  private String favData;
  private String prfPicture;
  private String selectedCharts;
}
