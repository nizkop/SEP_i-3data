import {UserRole} from "./userrole";

export class User {
  id: number =0;
  userName : string = '';
  firstName : string = '';
  lastName : string = '';
  email : string = '';
  password: string = '';
  birthDate: string = '';
  role: UserRole | undefined;
  prfPicture:string = "";
  favData: string = '$';
}
