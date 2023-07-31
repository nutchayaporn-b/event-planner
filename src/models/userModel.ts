import { User } from "firebase/auth";

export interface FullUser extends User {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
}