import {Thread} from "./thread";

export class Article {
  id? :number;
  payload: string = "";
  writtenBy: string = "";
  thread: Thread | {id:number} | undefined
  createdAt: string = "";
}
