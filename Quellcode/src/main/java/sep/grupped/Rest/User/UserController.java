package sep.grupped.Rest.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import sep.grupped.Rest.security.token.Token;
import sep.grupped.Rest.security.token.TokenRepository;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping("/User")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
  @Autowired
  TokenRepository tokenRepository;

  @Autowired
  UserRepository userRepository;

  @Autowired
  ImageRepository imageRepository;

  @DeleteMapping ("/delete/image/{userId}")
  public void deletePrfPic(@PathVariable Long userId) {
    Optional<Image> image = imageRepository.findByName(userId);
    if (image.isPresent()){
      imageRepository.deleteById(image.get().getId());
    }
    else {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Entry not found with this ID");
    }
  }

  @PostMapping("/upload/image/{userId}")
  public ResponseEntity <ImageUploadResponse> uploadImage(@RequestBody MultipartFile file,
                                                          @PathVariable Long userId)
    throws IOException {
    imageRepository.save(Image.builder()
      .name(userId)
      .type(file.getContentType())
      .image(file.getBytes()).build());
  return ResponseEntity.status(HttpStatus.OK)
    .body(new ImageUploadResponse("Image uploaded successfully: " + file.getOriginalFilename()));
  }

  @GetMapping(path = {"/get/image/{name}"})
  public Image getImageDetails(@PathVariable("name") Long name) throws NoSuchElementException, IOException {

    final Optional<Image> dbImage = imageRepository.findByName(name);
    if(dbImage.isPresent()){
      return Image.builder()
        .type(dbImage.get().getType())
        .image(dbImage.get().getImage()).build();
    }else{ throw new ResponseStatusException(HttpStatus.OK, "No picture uploaded"); }
  }

  @GetMapping("/token/{token}")
  public ResponseEntity<UserDTO> getUserByToken(@PathVariable String token) {
    if (token.startsWith("Bearer ")) {
      token = token.substring(7); // Remove "Bearer " prefix
    }
    Optional<Token> optionalToken = tokenRepository.findByToken(token);
    if (optionalToken.isPresent()) {
      Token foundToken = optionalToken.get();
      UserDTO userDTO = convertToUserDTO(foundToken.getUser());
      return ResponseEntity.ok(userDTO);
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  // Convert User entity to UserDTO
  private UserDTO convertToUserDTO(User user) {
    return new UserDTO(
      user.getId(),
      user.getUserName(),
      user.getFirstName(),
      user.getLastName(),
      user.getPassword(),
      user.getEmail(),
      user.getRole(),
      user.getPrfPicture(),
      user.getFavData()
    );
  }

  @GetMapping("/Login/{username}/{password}")
  public User Login(@PathVariable String username, @PathVariable String password) {
    User user = getUserByUsername(username);
    if (user.getUserName() == username && user.getPassword() == password) {
      return user;
    }
    throw new ResponseStatusException(HttpStatus.NOT_FOUND);
  }
  @GetMapping("/getByUsername/{username}")
  public User getUserByUsername(@PathVariable String username){
    Optional<User> user = userRepository.findByUserName(username);
    if(user.isPresent()){
        return user.get();
    }
    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Username not found");
  }

  @PostMapping("/add")
  public void createEntry(@RequestBody User user) {
    userRepository.save(user);
  }
  @GetMapping("/get/{entryId}")
  public User getEntry(@PathVariable Long entryId) {
    Optional<User> user = userRepository.findById(entryId);
    if(user.isPresent()){
      return user.get();
    }
    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Entry not found with this ID");

  }



  @PutMapping("/update/{entryId}")
  public void updateEntry(@PathVariable Long entryId, @RequestBody User userUpdate) {
    Optional<User> user = userRepository.findById(entryId);
    if(!user.isPresent()){
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Entry not found with this ID");
    }
    User userInstance = user.get();
    userInstance.setFirstName(userUpdate.getFirstName());
    userInstance.setEmail(userUpdate.getEmail());
    userInstance.setLastName(userUpdate.getLastName());
    userInstance.setFavData(userUpdate.getFavData());
    userInstance.setUserName(userUpdate.getUserName());
    userInstance.setPassword(userUpdate.getPassword());
    userInstance.setRole(userUpdate.getRole());
    userInstance.setBirthDate(userUpdate.getBirthDate());
    userRepository.save(userInstance);
  }
  @DeleteMapping ("/delete/{entryId}")
  public void deleteEntry(@PathVariable Long entryId) {
    Optional<User> user = userRepository.findById(entryId);
    if(user.isPresent()){
      userRepository.deleteById(entryId);
      return;
    }
    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Entry not found with this ID");
  }
  @GetMapping("")
  public List<User> getAllUsers()
  {
    return (List<User>) userRepository.findAll();
  }
}
