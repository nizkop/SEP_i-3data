package sep.grupped.Rest.mail;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderService {
  @Autowired
  private JavaMailSender mailSender;

  private String verificationCode = "";
  private String Supercode = "000000";
  private String[] securityCodes = {verificationCode, Supercode};



  private void sendMail(String toEmail, String subject, String body) {
    try {
      SimpleMailMessage message = new SimpleMailMessage();
      message.setFrom("datalove987@gmail.com");
      message.setTo(toEmail);
      message.setText(body);
      message.setSubject(subject);
      mailSender.send(message);
      System.out.println("Mail sent to " + toEmail);
    } catch (MailException e) {
      // Hier kannst du die Ausnahmebehandlung durchführen, z.B. eine Benachrichtigung ausgeben oder ein Protokolleintrag machen
      System.err.println("An error occurred while sending email: " + e.getMessage());
      throw new MailSendException("An error occurred while sending email.", e);
    }
  }

  public void ticketIsFinished(String toEmail){
    String subject = "I-LOVE-DATA: Support-Ticket";
    String body = "Hallo,\nDas von Ihnen erstellte Support-Ticket wurde erfolgreich bearbeitet! \n Vielen Danke für Ihre Hilfe! <3";
    this.sendMail(toEmail, subject, body);
  }

  public void createVerificationCode() {
    int createCode = (int) Math.floor(Math.random() * (9999999 - 100000 + 1)) + 100000;
    verificationCode = Integer.toString(createCode);
    securityCodes[0] = verificationCode;
  }

  public String[] getVerificationCode() {
    return securityCodes;
  }

  public String sendRegisterConfirm(String toEmail) {
    createVerificationCode();
    String pwd = this.verificationCode;
    String subject = "I-LOVE-DATA: Registrierung";
    String body = "Hallo,\nSie haben sich erfolgreich bei I-Love-Data registriert.\n" +
      "Wenn Sie sich nun einloggen möchten, geben Sie auf der sich geöffneten Seite " +
      "folgenden Schlüssel zur Bestätigung Ihrer Identität ein:\t" + pwd;
    this.sendMail(toEmail, subject, body);
    return pwd;
  }

  public String getSupercode() {
    return Supercode;
  }

  public String sendAuthCode(String toEmail) {
    createVerificationCode();
    String pwd = this.verificationCode;
    String subject = "I-LOVE-DATA: Login-Validierung";
    String body = "Hallo,\njemand hat versucht, sich in Ihren Account bei I-Love-Data einzuloggen.\n" +
      "Wenn Sie das waren, können Sie sich mit folgendem Schlüssel einloggen:\t" + pwd;
    this.sendMail(toEmail, subject, body);
    return pwd;
  }

  public void sendAnfragemail(String toEmail) {
    String subject = "I-LOVE-DATA: Freundschaftsanfrage erhalten";
    String body = "Hallo,\nSie haben eine neue Freundschaftsanfrage erhalten.";
    this.sendMail(toEmail, subject, body);
    System.out.println("Email Nutzeranfrage");
  }

  public void sendForumnotif(String toEmail){
    String subject = "I-LOVE-DATA: Neuer Post in einem Thread";
    String body ="Hallo,\nIn einem Ihrer favorisierten Threads wurde ein neuer Kommentar veröffentlicht. Schauen Sie doch mal nach.";
    this.sendMail(toEmail, subject, body);
  }

}

