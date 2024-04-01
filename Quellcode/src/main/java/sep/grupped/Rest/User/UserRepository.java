package sep.grupped.Rest.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

  User findById (long id);

  User findByLastName (String lastName);

  User findByFirstName (String firstName);

  User findByBirthDate (String birthDate);

  Optional<User> findByUserName (String userName);

  Optional<User> findByEmail(String email);

  User findByPrfPicture(String prfPicture);

  User findByFavData(String favData);

}
