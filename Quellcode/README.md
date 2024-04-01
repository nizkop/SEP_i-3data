# Gruppe-D
Standarduser: admin@mail.com , password 


## zum Aktivieren des JSONArray-Imports: 
npm install leaflet
npm install --save-dev @types/leaflet




## Geodaten: 

Leaflet: WGS84-Format (EPSG:4326) = gebräuchlich 

GeoJSON-Datensatz = metrische Koordinaten im EPSG:25832-Koordinatensystem = UTM Zone 32N 


## Add your files

- [ ] [Create](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files
- [ ] [Add files using the command line](https://docs.gitlab.com/ee/gitlab-basics/add-file.html#add-a-file-using-the-command-line) or push an existing Git repository with the following command:

```
cd existing_repo
git remote add origin https://git.uni-due.de/sep/sommersemester_2023/gruppe-a-d/gruppe-d.git
git branch -M main
git push -uf origin main
```
```
git config --global user.name “vorname nachname”
git config --global user.email vn.nn@stud.uni-duisburg-essen.de
```



## Docker
im Hauptordner, wo die Docker-Dateien liegen, ausführen per Kommandozeile 
### 1. Bauen & Starten der Images aus den Dockerfiles
- Allgemein:  
  - Anzeigen der laufenden Images:  ```docker image ls ```
  - Anzeigen der laufenden Container:  ```docker container ls -a```
  - Anzeigen der aktuellen Volumes:  ```docker volume ls ```
  - Entfernen eines Images (per ID), z.B.  ```docker image rm <ID> ``` (analgo für volumes) 
  - Entfernen eines Containers (muss gestoppt sein):  ```docker rm <ID>```  
  - Bauen & Starten: 
      ```docker build -t my_image .  ```  
      ```docker run my_image   ```    
  - mit automatischem Stoppen des Containers beim Beenden: 
      ```docker run --rm -p 4200:4200 -it my_image ```  
  - Entfernen gestoppter Container: ```docker system prune```
  
- bei uns:
  - frontend:   
        ```docker run --rm -p 4200:4200 -it my_image```  
        ```docker run --rm -p 4200:4200 -it image_frontend```
  - backend:   
    ``` docker build -t image_backend . -f Dockerfile_backend ```   
    ``` docker run --rm -it image_backend``` 

### 2. Docker Images per tar-Dateien: 
- Herstellen: 
  - Bilden per:   
      ```docker image save image_frontend -o docker_image_frontend.tar```  
      ```docker image save image_backend -o docker_image_backend.tar```
- Nutzen: 
  - Laden der tar mögl. per, d.h. hier:   
    ```docker load -i docker_image_frontend.tar```  
    bzw.  
    ```docker load -i docker_image_backend.tar```
  - danach normal starten mögl., d.h.   
    ```docker run --rm -p 4200:4200 -it image_frontend```  
     bzw.   
    ``` docker run --rm -it image_backend```

### 3. Docker Images in Kombination starten (1 Netzwerk)
1. Docker Images laden (z.B. ```docker load -i docker_image_frontend.tar```  )
oder erstellen ( ``` docker build -t image_backend . -f Dockerfile_backend ``` )  
<span style="color:red">! nicht starten = kein ```docker run```-Kommando nötig </span>.  
2. wenn docker-compose.yml vorhanden ist: ```docker compose up ```   
in unserem Fall sollte das frontend wie üblich unter localhost:4200/ erreichbar sein; 
mit dem backend kommunizieren können und Daten werden im volume <aktueller Ordnername>_data gespeichert  
durch Stoppen (Ctrl+C), Löschen des backend-Containers und Neustarten von ```docker compose up ``` sollten dennoch keine Daten verloren gehen  







Notizen:  
- npm-Flags: 
  - -g = global 
  - --save = installs the package and updates the dependencies in package.json
- Warnings bei npm install durch -g npm@9.6.5 behoben (npm WARN deprecated @npmcli/move-file@2.0.1: This functionality has been moved to @npmcli/fs)
- Fehlermeldung aufgrund Internet-Verbindungs-Fehler: 
  - *Inlining of fonts failed. An error has occurred while retrieving https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap over the internet.
  getaddrinfo EAI_AGAIN fonts.googleapis.com* 
  - *db Error: Error response from daemon: Get "https://registry-1.docker.io/v2/": 
net/http: request canceled while waiting for connection (Client.Timeout exceeded while awaiting headers)*
- Persistenz muss bestehen, wenn: docker container löschen, aber image nicht


## Modultests 
### Angular 
.spec.ts (einfach in IntelliJ starten) -> korrigieren der Imports und ggf. Beispieluser für interne Seiten

ohne MatInputModule entsteht der seltsame Fehler: Error: mat-form-field must contain a MatFormFieldControl.


## Integrate with your tools

- [ ] [Set up project integrations](https://git.uni-due.de/sep/sommersemester_2023/gruppe-a-d/gruppe-d/-/settings/integrations)

## Collaborate with your team

- [ ] [Invite team members and collaborators](https://docs.gitlab.com/ee/user/project/members/)
- [ ] [Create a new merge request](https://docs.gitlab.com/ee/user/project/merge_requests/creating_merge_requests.html)
- [ ] [Automatically close issues from merge requests](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#closing-issues-automatically)
- [ ] [Enable merge request approvals](https://docs.gitlab.com/ee/user/project/merge_requests/approvals/)
- [ ] [Automatically merge when pipeline succeeds](https://docs.gitlab.com/ee/user/project/merge_requests/merge_when_pipeline_succeeds.html)

## Test and Deploy

Use the built-in continuous integration in GitLab.

- [ ] [Get started with GitLab CI/CD](https://docs.gitlab.com/ee/ci/quick_start/index.html)
- [ ] [Analyze your code for known vulnerabilities with Static Application Security Testing(SAST)](https://docs.gitlab.com/ee/user/application_security/sast/)
- [ ] [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://docs.gitlab.com/ee/topics/autodevops/requirements.html)
- [ ] [Use pull-based deployments for improved Kubernetes management](https://docs.gitlab.com/ee/user/clusters/agent/)
- [ ] [Set up protected environments](https://docs.gitlab.com/ee/ci/environments/protected_environments.html)

***

# Editing this README

When you're ready to make this README your own, just edit this file and use the handy template below (or feel free to structure it however you want - this is just a starting point!). Thank you to [makeareadme.com](https://www.makeareadme.com/) for this template.

## Suggestions for a good README
Every project is different, so consider which of these sections apply to yours. The sections used in the template are suggestions for most open source projects. Also keep in mind that while a README can be too long and detailed, too long is better than too short. If you think your README is too long, consider utilizing another form of documentation rather than cutting out information.

## Name
Choose a self-explaining name for your project.

## Description
Let people know what your project can do specifically. Provide context and add a link to any reference visitors might be unfamiliar with. A list of Features or a Background subsection can also be added here. If there are alternatives to your project, this is a good place to list differentiating factors.

## Badges
On some READMEs, you may see small images that convey metadata, such as whether or not all the tests are passing for the project. You can use Shields to add some to your README. Many services also have instructions for adding a badge.

## Visuals
Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## Installation
Within a particular ecosystem, there may be a common way of installing things, such as using Yarn, NuGet, or Homebrew. However, consider the possibility that whoever is reading your README is a novice and would like more guidance. Listing specific steps helps remove ambiguity and gets people to using your project as quickly as possible. If it only runs in a specific context like a particular programming language version or operating system or has dependencies that have to be installed manually, also add a Requirements subsection.

## Usage
Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.

## Support
Tell people where they can go to for help. It can be any combination of an issue tracker, a chat room, an email address, etc.

## Roadmap
If you have ideas for releases in the future, it is a good idea to list them in the README.

## Contributing
State if you are open to contributions and what your requirements are for accepting them.

For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.

You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.

## Authors and acknowledgment
Show your appreciation to those who have contributed to the project.

## License
For open source projects, say how it is licensed.

## Project status
If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.
