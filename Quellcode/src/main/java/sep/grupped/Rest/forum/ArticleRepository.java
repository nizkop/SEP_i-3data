package sep.grupped.Rest.forum;

import org.springframework.data.jpa.repository.JpaRepository;
public interface ArticleRepository extends JpaRepository<Article, Long> {
}
