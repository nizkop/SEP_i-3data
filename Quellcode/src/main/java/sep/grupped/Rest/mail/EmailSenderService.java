package sep.grupped.Rest.mail;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderService {
  @Autowired
  private JavaMailSender mailSender;

  private String verificationCode = "";
  private String Supercode="000000";
  private String[] securityCodes = {verificationCode, Supercode};



  private void sendMail(String toEmail,
                       String subject,
                       String body
  ) {
    SimpleMailMessage message = new SimpleMailMessage();
    message.setFrom("datalove987@gmail.com");
    message.setTo(toEmail);
    message.setText(body);
    message.setSubject(subject);
    mailSender.send(message);
    System.out.println("Mail send to "+ toEmail);
  }

  public void createVerificationCode(){
    int createCode = (int) Math.floor(Math.random()*(9999999-100000+1)) + 100000;
    verificationCode = Integer.toString(createCode);
    securityCodes[0] = verificationCode;
  }

  public String[] getVerificationCode(){
    return securityCodes;
  }

  public String sendRegisterConfirm(String toEmail){
    createVerificationCode();
    String pwd = this.verificationCode;
    String subject = "I-LOVE-DATA: Registrierung";
    String body = "Hallo,\nSie haben sich erfolgreich bei I-Love-Data registriert.\n"+
                  "Wenn Sie sich nun einloggen möchten, geben Sie auf der sich geöffneten Seite "+
                  "folgenden Schlüssel zur Bestätigung Ihrer Identität ein:\t"+ pwd;
    this.sendMail(toEmail, subject, body);
    return pwd;
  }

  public String getSupercode(){return Supercode;}

  public String sendAuthCode(String toEmail){
    createVerificationCode();
    String pwd = this.verificationCode;
    String subject = "I-LOVE-DATA: Login-Validierung";
    String body = "Hallo,\njemand hat versucht, sich in Ihren Account bei I-Love-Data einzuloggen.\n" +
                  "Wenn Sie das waren, können Sie sich mit folgendem Schlüssel einloggen:\t"+ pwd;
    this.sendMail(toEmail, subject, body);
    return pwd;
  }



}

