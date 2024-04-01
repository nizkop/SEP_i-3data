package sep.grupped.Rest.ticket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sep.grupped.Rest.User.User;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/ticket")
@CrossOrigin(origins = "http://localhost:4200")
public class TicketController {

  @Autowired TicketRepository ticketRepository;

  @PostMapping("/post")
  public void postTicket(@RequestBody Ticket ticket){
    ticketRepository.save(ticket);
  }

  @GetMapping("/get")
  public List<Ticket> getAllTickets()
  {
    return (List<Ticket>) ticketRepository.findAll();
  }

  @GetMapping("/get/ticket/{id}")
  public Ticket getTicketById(@PathVariable Long id){
    Optional<Ticket> ticket = ticketRepository.findById(id);
    return ticket.get();
  }

  @PutMapping("/update/{userid}")
  public void updateTicketStatus(@PathVariable Long userid, @RequestBody String status){
    Ticket ticket = ticketRepository.findById(userid).get();
    ticket.setStatus(status);
    System.out.println(ticket);
    ticketRepository.save(ticket);
  }
}

