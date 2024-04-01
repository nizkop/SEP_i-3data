package sep.grupped.Rest.mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@CrossOrigin(origins = "http://localhost:4200")
public class EmailController {

  @Autowired
  private EmailSenderService emailSenderService;

  @PostMapping("/send")
  public void sendEmail(@RequestBody String emailAddress) {
    emailSenderService.sendAuthCode(emailAddress);
    System.out.println("Login: Email wurde versandt");
  }

  @PostMapping("/register")
  public void sendRegisterConfirm(@RequestBody String emailAddress) {
    emailSenderService.sendRegisterConfirm(emailAddress);
    System.out.println("Register: Email wurde versandt");
  }

  @PostMapping("/anfrage")
  public void sendRequestMail(@RequestBody String emailAddress) {
    System.out.println("Anfrage erhalten");
    emailSenderService.sendAnfragemail(emailAddress);
    System.out.println("Anfrage: Email wurde versandt");
  }


  @GetMapping("/send")
  public String[] getVerificationCode(){
    return emailSenderService.getVerificationCode();
  }

  @PostMapping("/ticketisfinished")
  public void ticketIsFinished(@RequestBody String emailAddress){
    emailSenderService.ticketIsFinished(emailAddress);
    System.out.println("Ticket: Email wurde versandt");
  }

}
