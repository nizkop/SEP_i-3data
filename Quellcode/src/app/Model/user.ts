import {UserRole} from "./userrole";
import {Thread} from "./thread";

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
  friends: User[] = [];
  friendrequests: User[] = [];
  friendsPrivate: boolean | undefined;
  favThreadIds: number[] = [];
  likedThreads: number[] = [];
  selectedCharts : string = '0000000000';
  profileViewPrivate: boolean | undefined;
}
