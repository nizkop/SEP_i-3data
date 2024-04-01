package sep.grupped.Rest.ticket;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import sep.grupped.Rest.User.Image;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Optional;


public interface TicketRepository extends JpaRepository<Ticket, Long> {

  Ticket findById(long id);

}
