import { Component, OnInit } from '@angular/core';
import {User} from "../Model/user";
import {UserService} from "../services/user.service";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css']
})
export class UserviewComponent {
  uploadedImage: File=new File([""], "");
  dbImage: any;
  postResponse: any;
  successResponse: string="";
  image: any;
  users: User[] = [];
  userData: User = new User();
  username:string ='';
  displayedColumns: string[] = ['id', 'userName', 'firstName', 'lastName', 'email', 'password', 'birthDate', 'isAdmin', 'favData', 'prfPicture'];

 constructor(private userService: UserService,
             private httpClient: HttpClient) {
 }
   onImageUpload(event:any) {
    this.uploadedImage = event.target.files[0];
  }
  ngOnInit(): void {
    this.getAllUsers();
  }

  viewImage() {
    this.httpClient.get('http://localhost:8080/User/get/image/' + 5)
      .subscribe(
        res => {
          this.postResponse = res;
          this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
        }
      );
  }

  imageUploadAction() {
    const imageFormData = new FormData();
    imageFormData.append('file', this.uploadedImage);


    this.httpClient.post('http://localhost:8080/User/upload/image/' +5 , imageFormData, { observe: 'response' })
      .subscribe((response) => {
          if (response.status === 200) {
            this.postResponse = response;
            this.successResponse = this.postResponse.body.message;
          } else {
            this.successResponse = 'Image not uploaded due to some error!';
          }
        }
      );
  }



   getAllUsers(): void {
    this.userService.getAllUsers().subscribe((data:  User[]) => {
      this.users = data;
    });
  }

   addUser(): void {
   console.log(this.userData.birthDate);
    this.userService.createUser(this.userData).subscribe(() => {
      this.getAllUsers();
      this.resetUserData();
    });
  }

  deleteUser(): void {
    if (this.userData.id) {
      this.userService.deleteUser(this.userData.id).subscribe(() => {
        this.getAllUsers();
        this.resetUserData();
      });
    } else {
      alert('Please enter an entry ID');
    }
  }

  updateUser(): void {
    if (this.userData.id) {
      this.userService.updateUser(this.userData.id, this.userData).subscribe(() => {
        this.getAllUsers();
        this.resetUserData();
      });
    } else {
      alert('Please enter an entry ID');
    }
  }
  resetUserData(): void {
    this.userData = new User();
  }

}
