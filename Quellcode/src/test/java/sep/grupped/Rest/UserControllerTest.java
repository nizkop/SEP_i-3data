package sep.grupped.Rest;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import sep.grupped.Rest.User.User;
import sep.grupped.Rest.User.UserController;
import sep.grupped.Rest.User.UserRepository;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
class UserControllerTest {

  @Autowired
  private UserController userController;
  @MockBean
  private UserRepository userRepository;
  Long userId = 1L;


  @Test
  void testCreateEntry() {
    System.out.println("Test: Nutzer anlegen");
    User user = new User();
    user.setId(userId);
    user.setUserName("testUser");
    user.setFirstName("Max");
    user.setLastName("Mustermann");

    when(userRepository.save(user)).thenReturn(user);
    assertDoesNotThrow(() -> userController.createEntry(user));
    verify(userRepository, times(1)).save(user);
  }

  @Test
  void testUpdateUser() throws Exception {
    // Test-Nutzer für Änderungen heraussuchen:
    when(userRepository.findById(userId)).thenReturn(Optional.of(new User()));
    Optional<User> dummy = userRepository.findById(userId);
    if (dummy.isEmpty()) {// oder .isPresent()
      System.out.println("testUpdateUser: schon kein Nutzer im Test anlegbar");
      return;
    }
    // Nutzer mit Änderungen anlegen:
    User changedUser = new User();
    changedUser.setId(userId);
    changedUser.setUserName("testUser2");
    changedUser.setFirstName("Maxi");
    changedUser.setLastName("Musterfrau");
    changedUser.setEmail("test@mail.com");
    changedUser.setFavData("unsinnigerInhalt");
    changedUser.setPassword("pwd");

    // Update des Nutzers:
    userController.updateEntry(userId, changedUser); // getestete Funktion

    Optional<User> geaendert = userRepository.findById(userId);
    if(geaendert.isEmpty()){
      throw new Exception("Fehler: nach Änderungen ist der Nutzer nicht mehr abgreifbar");
    }
    // Kontrolle, ob Änderungen gespeichert wurden:
    assertEquals(changedUser.getUserName(), geaendert.get().getUserName());
    assertEquals(changedUser.getFirstName(), geaendert.get().getFirstName());
    assertEquals(changedUser.getLastName(), geaendert.get().getLastName());
    assertEquals(changedUser.getEmail(), geaendert.get().getEmail());
    assertEquals(changedUser.getFavData(), geaendert.get().getFavData());
    assertEquals(changedUser.getPassword(), geaendert.get().getPassword());
  }


  // Nutzer löschen (Tests müssen einzeln aufgerufen werden, weil sonst die Mock-Objekte noch zusammenhängen (-> Fehler)
  @Test
  void userDelete_vorhandenerNutzer() {
    // Fall 1: Eintrag gefunden und erfolgreich gelöscht
    System.out.println("Test: vorhandenen Nutzer löschen");
    when(userRepository.findById(userId)).thenReturn(Optional.of(new User()));
    assertDoesNotThrow(() -> userController.deleteEntry(userId));
    verify(userRepository, times(1)).findById(userId);
    verify(userRepository, times(1)).deleteById(userId);
  }

  @Test
  void userDelete_nichtVorhandenerNutzer() {
    // Fall 2: Eintrag nicht gefunden
    System.out.println("Test: Löschversuch eines Nutzers mit nicht-exisitierender ID");
    when(userRepository.findById(userId)).thenReturn(Optional.empty());
    ResponseStatusException notFoundException = assertThrows(ResponseStatusException.class, () -> userController.deleteEntry(userId));
    assertEquals(HttpStatus.NOT_FOUND, notFoundException.getStatus());
    assertEquals("Entry not found with this ID", notFoundException.getReason());
    verify(userRepository, times(1)).findById(userId);
    verify(userRepository, never()).deleteById(userId);
  }



}
