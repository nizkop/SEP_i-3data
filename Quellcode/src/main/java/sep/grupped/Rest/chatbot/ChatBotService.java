package sep.grupped.Rest.chatbot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ChatBotService {
  private ChatBotRepository chatBotMessageRepository;

  @Autowired
  public ChatBotService(ChatBotRepository chatBotMessageRepository) {
    this.chatBotMessageRepository = chatBotMessageRepository;
  }

 public BotMessageResponse processUserMessage(UserMessageRequest userMessageRequest) {
   String userMessage = userMessageRequest.getContent();

   String botResponse = generateBotResponse(userMessage);

   BotMessageResponse response = new BotMessageResponse();
   response.setResponse(botResponse);

   return response;
 }

  private String generateBotResponse(String userMessage) {
    String answer;

     if (containsKeywords(userMessage, "datensätze", "speichern")) {
      answer = "Das System speichert verschiedene Datensätze, darunter Vornamen von Neugeborenen, Arbeitslosenzahlen, Bevölkerungsstatistiken und mehr. Eine vollständige Liste im Hamburgermenu unter dem Feld Datensätze";
    }
     else if (containsKeywords(userMessage, "datensatz", "graphen", "diagrammen")) {
       answer = "Ja.Sie können die Anschauungsmöglichkeit wählen, z. B. Graphen (Treemap) oder Diagramm (Balkendiagramm), um die Datensätze visuell darzustellen.";
     }
     else if (containsKeywords(userMessage,  "exportieren")) {
       answer = "Sie können einen Datensatz im .pdf-Format exportieren, einschließlich der Anschauungsmöglichkeiten. Der exportierte Datensatz enthält einen Titel und das Exportdatum.";
     }
     else if (containsKeywords(userMessage, "chatten")) {
      answer = "Sie können private oder Gruppenchats erstellen und Nachrichten an Ihre Freunde senden. Die Nachrichten   können bearbeitet oder gelöscht werden, solange sie nicht gelesen wurden.";
    }
    else if (containsKeywords(userMessage, "diskussionsforum")) {
      answer = "Sie können im Diskussionsforum  Diskussionsthemen eröffnen und Kommentare anderer Nutzer dazu erhalten. Außerdem  können Sie  Diskussionsthemen liken und favorisieren, um über neue Beiträge und Änderungen benachrichtigt zu werden.";
    }
     else if (containsKeywords(userMessage, "benachrichtigt")) {
       answer = " Sie  erhalten  E-Mail-Benachrichtigungen über neue Beiträge und Änderungen in diesem Diskussionsthema, wenn Sie ein Diskussionsthema favorisiert haben";
     }
    else if (containsKeywords(userMessage, "persönliche profilansicht")) {
      answer = "Sie können Ihre persönliche Profilansicht erstellen, indem Sie bis zu vier von Ihnen ausgewählte Datensätze und eine Anschauungsmöglichkeit festlegen. Sie haben die Möglichkeit, Ihre persönliche Profilansicht zu bearbeiten und zu speichern. Zusätzlich können Sie entscheiden, ob Ihre Profilansicht öffentlich oder privat ist, sodass andere Nutzer Ihre Profilansicht sehen können oder nicht.";

     }
    else if(containsKeywords(userMessage,"Geodaten", "einpflegen")){
      answer="Um eigene Geodaten in das System einzupflegen, steht Ihnen die Funktion \"Geodaten einlesen \" im Adminbereich zur Verfügung. Sie können Ihre Geodaten im GeoJSON-Format bereitstellen. Das System ermöglicht Ihnen, eine interaktive Landkarte zu erstellen, auf der Ihre Geodaten entsprechend dargestellt werden. Sie können verschiedene Symbole oder Marker verwenden, um die verschiedenen Arten von Daten, wie zum Beispiel Schutzhütten, Rettungspunkte und Knotenpunkte, voneinander zu unterscheiden. Auf diese Weise können Sie Ihre eigenen Datensätze in das System integrieren und sie visuell ansprechend präsentieren.";
    }
     else if(containsKeywords(userMessage,"Schutzhütten", "Aachener Wald" )){
       answer="Um sich die Schutzhütten im Aachener Wald anzeigen zu lassen, müssen Sie die auf die Landkarte und dann können Sie die Funktion \"Schutzhütten anzeigen\" verwenden. Das System wird Ihnen eine Landkarte präsentieren, auf der die Standorte der Schutzhütten markiert sind. Sie können auf die Markierungen klicken, um weitere Informationen zu jeder Schutzhütte zu erhalten";
     }
     else if(containsKeywords(userMessage, "Karte")){
       answer="Ja, neben den Schutzhütten können auch weitere Objekte auf der Karte angezeigt werden. Das System bietet die Möglichkeit, zusätzliche Datenpunkte wie Rettungspunkte und Knotenpunkte einzublenden. Sie können auf die entsprechenden Funktionen zugreifen, um die gewünschten Objekte auf der Karte darzustellen.";
     }
    else if(containsKeywords(userMessage,"Support-Ticket", "Supportticket", "öffnen")){
      answer="Um ein Support-Ticket zu öffnen und fehlerhafte Datensätze zu melden, können Sie die Funktion \"Support-Ticket öffnen\" verwenden. Diese Funktion ermöglicht es Ihnen, Informationen über den fehlerhaften Datensatz einzugeben und das Problem zu beschreiben. Nachdem Sie das Ticket geöffnet haben, wird der Status automatisch auf \"In Bearbeitung\" gesetzt.";
    }
     else if(containsKeywords(userMessage,"bearbeitet")){
       answer="Ein Systemadministrator wird sich  nach dem öffnen Ihres Support-Tickets mit Ihrem Anliegen befassen und das Problem lösen. Sobald der Datensatz korrigiert wurde, wird der Administrator den Bearbeitungsstatus auf \"Erledigt\" setzen. Sie werden per E-Mail über die Erledigung des Support-Tickets benachrichtigt, um Sie über den Fortschritt zu informieren.";
     }
     else if(containsKeywords(userMessage, "Freundschaftsanfrage", "Freundesliste ","hinzufügen","verwalten")){
       answer="Nutzer können andere Nutzer als Freunde hinzufügen, indem sie Freundschaftsanfragen senden. Wenn ein Nutzer eine Freundschaftsanfrage erhält, kann er diese annehmen oder ablehnen. Die Freundesliste wird für jeden Nutzer angelegt, und er kann seine Freunde dort sehen und verwalten. Die Nutzer werden über eingehende Freundschaftsanfragen per E-Mail benachrichtigt, um über neue Kontakte informiert zu werden. Die Freundesliste kann öffentlich oder privat eingestellt werden, je nachdem, ob andere Nutzer sehen sollen, wer in der Liste enthalten ist.";
     }

    else {
      answer = "Entschuldigung, ich konnte keine passende Antwort auf Ihre Frage finden. Bitte stellen Sie Ihre Frage genauer.";
    }

    return answer;
  }


  private boolean containsKeywords(String question, String... keywords) {
    for (String keyword : keywords) {
      if (question.toLowerCase().contains(keyword.toLowerCase())) {
        return true;
      }
    }
    return false;
  }
}


