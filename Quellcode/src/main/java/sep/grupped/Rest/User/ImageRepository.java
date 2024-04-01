package sep.grupped.Rest.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;



public interface ImageRepository extends JpaRepository<Image, Long> {
  Optional<Image> findByName(Long name);
}
