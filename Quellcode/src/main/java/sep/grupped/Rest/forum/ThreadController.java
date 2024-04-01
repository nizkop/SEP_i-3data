package sep.grupped.Rest.forum;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/thread")
@CrossOrigin(origins = "http://localhost:4200")
public class ThreadController {

  @Autowired ThreadRepository threadRepository;
  @Autowired ArticleRepository articleRepository;


  @PostMapping("/newThread")
  public ResponseEntity<?> createThread(@RequestBody forumThread thread){
    forumThread respThread = threadRepository.save(thread);

//    System.out.println(thread);
    return ResponseEntity.ok(respThread);
  }

  @GetMapping("/get/allThreads")
  public List<forumThread> getAllThreads(){
    return (List<forumThread>) threadRepository.findAll();
  }
  @GetMapping("get/{id}")
  public forumThread getThreadByID(@PathVariable Long id){
    return threadRepository.findById(id).get();
  }

  @PutMapping("/{threadId}/likeThread")
  public void likeThread(@PathVariable Long threadId){
    forumThread thread = threadRepository.findById(threadId).orElse(null);
    if(thread != null){
      if(thread.getTimesLiked() == null){
        thread.setTimesLiked(1L);
        threadRepository.save(thread);
      }
      else{
        thread.setTimesLiked(thread.getTimesLiked()+1);
        threadRepository.save(thread);
      }
    }
  }

  @PutMapping("/{threadId}/dislikeThread")
  public void dislikeThread(@PathVariable Long threadId){
    forumThread thread = threadRepository.findById(threadId).orElse(null);
    Long timesLiked = thread.getTimesLiked();
    thread.setTimesLiked(timesLiked-1);
    threadRepository.save(thread);
  }


  @PostMapping("/{threadId}/sendArticle")
  public void sendArticle(@PathVariable Long threadId, @RequestBody Article article){
      forumThread thread = threadRepository.findById(threadId).orElse(null);
      if(thread != null){
        thread.addArticle(article);
        threadRepository.save(thread);
    }
  }

  @PutMapping("/{articleId}/deleteArticle")
  public void deleteArticle(@PathVariable Long articleId){
    Optional<Article> optionalArticle = articleRepository.findById(articleId);
    if(optionalArticle.isPresent()){
      Article article = optionalArticle.get();
      forumThread thread = article.getThread();
      thread.getArticles().remove(article);
      threadRepository.save(thread);
      articleRepository.delete(article);
    }

  }

  @PostMapping("/{threadId}/postFavUser")
  public void postFavUser(@PathVariable Long threadId, @RequestBody String userMail){
      forumThread thread = threadRepository.findById(threadId).orElse(null);
      if(thread != null){
        thread.addfavUserMail(userMail);
        threadRepository.save(thread);
      }
  }

  @PutMapping("/{threadId}/removeFavUser")
  public void removeFavUser(@PathVariable Long threadId, @RequestBody String userMail){
    forumThread thread = threadRepository.findById(threadId).orElse(null);
    if(thread != null){
      thread.removeFavUserMail(userMail);
      threadRepository.save(thread);
    }
  }

}
