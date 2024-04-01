package sep.grupped.Rest.ticket;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "ticket")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Ticket {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private String kategorie;
  private String betreff;
  private String nachricht;
  private String status;
  private String writtenByMail;

  public void setKategorie(String kategorie){this.kategorie = kategorie;}

  public void setBetreff(String betreff){this.betreff = betreff;}

  public void setNachricht(String nachricht){this.nachricht = nachricht;}

  public void setStatus(String status){this.status = status;}

  public void setWrittenById(String writtenById) {this.writtenByMail = writtenByMail;}

  public String getKategorie(){return this.kategorie;}

  public String getBetreff(){return this.betreff;}

  public String getNachricht(){return this.nachricht;}

  public String getStatus(){return this.status;}

  public String getWrittenById(){return this.writtenByMail;}
}
