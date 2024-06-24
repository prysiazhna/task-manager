import { Task } from "./task";

export class User {
  id: string;
  username: string;
  password: string;
  tasks: Task[];
}
