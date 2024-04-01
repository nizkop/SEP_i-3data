import {Article} from "./article";

export class Thread {

  id :number = 0;
  name :String = "";
  threadDescription :String = "";
  category: String = "";
  articles :Article[] = [];
  timesLiked: number = 0;
  favUser: string[] = [];
}
