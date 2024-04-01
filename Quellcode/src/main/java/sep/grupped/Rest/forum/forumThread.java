package sep.grupped.Rest.forum;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@Entity
@Table(name = "thread")
@JsonIdentityInfo(
  generator = ObjectIdGenerators.PropertyGenerator.class,
  property = "id")
public class forumThread {


  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  private String name;
  @Column(length = 90000)
  private String threadDescription;
  private String category;

  @OneToMany(mappedBy = "thread", cascade = CascadeType.ALL)
  private List<Article> articles;
  private Long timesLiked;

  @ElementCollection
  private List<String> favUser;

  public void addArticle(Article article){
    if(articles == null){
      articles = new ArrayList<>();
    }
    articles.add(article);
    article.setThread(this);
  }

  public void addfavUserMail(String userMail){
    if(favUser == null){
      favUser = new ArrayList<String>();
    }

    favUser.add(userMail);
  }

  public void removeFavUserMail(String userMail){ favUser.remove(userMail); }
}
