import {User} from "../user";
import {UserRole} from "../userrole";

export const testuser: User = {
  id: 0,
  firstName: 'Vorname',
  lastName: 'Nachname',
  userName: 'Nutzername',
  favData: '',
  email: 'admin@mail.com',
  password: 'password',
  role: UserRole.ADMIN,
  birthDate: '01.01.2000',
  prfPicture: '',
  friends: [],
  friendrequests: [],
  friendsPrivate: undefined
};


export const testuser2: User = {
  id: 1,
  firstName: 'Vorname',
  lastName: 'Nachname',
  userName: 'Nutzername',
  favData: '',
  email: 'admin@mail.com',
  password: 'password',
  role: UserRole.ADMIN,
  birthDate: '01.01.2000',
  prfPicture: '',
  friends: [],
  friendrequests: [],
  friendsPrivate: undefined
};
