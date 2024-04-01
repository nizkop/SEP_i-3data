package sep.grupped.Rest.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sep.grupped.Rest.security.token.Token;
import sep.grupped.Rest.security.token.TokenRepository;

import java.util.Optional;

@Service
public class UserService {
  @Autowired
  private TokenRepository tokenRepository;

  public Optional<User> getUserFromToken(String token) {
    return tokenRepository.findByToken(token).map(Token::getUser);
  }
}
