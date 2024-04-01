package sep.grupped.Rest.User;


import com.fasterxml.jackson.annotation.*;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import sep.grupped.Rest.chat.model.ChatRoom;
import sep.grupped.Rest.forum.forumThread;
import sep.grupped.Rest.security.token.Token;

import javax.persistence.*;
import java.util.*;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Nutzer", uniqueConstraints = {
    @UniqueConstraint(columnNames = "userName"),
    @UniqueConstraint(columnNames = "email")
})
@JsonIdentityInfo(
  generator = ObjectIdGenerators.PropertyGenerator.class,
  property = "id")
public class User implements UserDetails {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  private String userName;

  private String firstName;

  private String lastName;
  private String email;

  private String password;

  private String birthDate;

  private String selectedCharts;

  private boolean profileViewPrivate;

  private boolean friendsPrivate;

  @Enumerated(EnumType.STRING)
  private UserRole role;

  @Column(length = 90000)
  private String favData;
  private String prfPicture;

  @OneToMany(mappedBy = "user")
  @JsonManagedReference
  private List<Token> tokens;

  //Freundesliste
  @ManyToMany
  @JoinTable(
    name = "user_friends",
    joinColumns = @JoinColumn(name = "user_id"),
    inverseJoinColumns = @JoinColumn(name = "friend_id")
  )
  @JsonIgnore
  private List<User> friends;

  @OneToMany
  @JsonIgnore
  private List<User> friendrequests;

  @ElementCollection
  private List<Long> favThreadIds;

  @ElementCollection
  private List<Long> likedThreads;

  public List<User> getFriendrequests() {
    return friendrequests;
  }

  public void setFriendrequests(List<User> friendrequests) {
    this.friendrequests = friendrequests;
  }

  public List<User> getFriends() {
    return friends;
  }

  public void setFriends(List<User> friends) {
    this.friends = friends;
  }

  public boolean isFriendsPrivate() {
    return friendsPrivate;
  }

  public void setFriendsPrivate(boolean friendsPrivate) {
    this.friendsPrivate = friendsPrivate;
  }


  @ManyToMany(mappedBy = "users")
  @JsonIdentityReference(alwaysAsId = true)
  private List<ChatRoom> chatRooms;

  public void addLikedThread(Long threadId){
    if(likedThreads == null){
      likedThreads = new ArrayList<Long>();
    }
    likedThreads.add(threadId);
  }

  public void deleteLikedThreads(Long threadId){
    likedThreads.remove(threadId);
  }

  public void addFavThreadId(Long threadId) {
    if(favThreadIds == null){
      favThreadIds = new ArrayList<Long>();
    }
    favThreadIds.add(threadId);
  }

  public void deleteFavThreadId(Long threadId){
    favThreadIds.remove(threadId);
  }

  public List<Long> getLikedThreads(){ return likedThreads; }

  public void setLikedThreads(List<Long> likedThreads){ this.likedThreads = likedThreads; }

  public List<Long> getFavThreads(){return favThreadIds;}

  public void setFavThreads(List<Long> favThreads){this.favThreadIds = favThreads;}

  public List<ChatRoom> getChatRooms() {
    return chatRooms;
  }

  public void setChatRooms(List<ChatRoom> chatRooms) {
    this.chatRooms = chatRooms;
  }

  public Long getId() {
    return id;
  }

  public String getUserName() {
    return userName;
  }

  public void setUserName(String userName) {
    this.userName = userName;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return role.getAuthorities();
  }

  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getBirthDate() {
    return birthDate;
  }

  public void setBirthDate(String birthDate) {
    this.birthDate = birthDate;
  }

  public UserRole getRole() {
    return role;
  }

  public void setRole(UserRole role) {
    this.role=role;
  }

  public String getFavData() {
    return favData;
  }

  public void setFavData(String favData) {
    this.favData = favData;
  }

  public String getSelectedCharts() {
    return selectedCharts;
  }

  public void setSelectedCharts(String selectedCharts) {
    this.selectedCharts = selectedCharts;
  }

  public boolean isProfileViewPrivate() {
    return profileViewPrivate;
  }

  public void setProfileViewPrivate(boolean profileViewPrivate) {
    this.profileViewPrivate = profileViewPrivate;
  }
}
