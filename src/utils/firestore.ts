import { User } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../App";
import { FullUser } from "../models/userModel";

export async function initUser(user: User){
  const docRef = await getDoc(doc(db, 'Users', user.uid));
  if(!docRef.exists()){

    await setDoc(doc(db, 'Users', user.uid), {
      uid: user.uid,
      email: user.email,
      firstName: "",
      lastName: "",
      photoURL: user.photoURL,
      dateOfBirth: "",
      gender: "",
    })
    return true;
  }
  return false;
}

export async function getFullUser(user: User) : Promise<FullUser>{
  const docRef = await getDoc(doc(db, 'Users', user.uid));
  console.log(docRef.data())
  //@ts-ignore
  return {
    ...user,
    ...docRef.data(),
  }
}

export async function saveFullUser(user: FullUser){
  const docRef = await getDoc(doc(db, 'Users', user.uid));
  if(docRef.exists()){
    await setDoc(doc(db, 'Users', user.uid), {
      uid: user.uid,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      photoURL: user.photoURL,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
    })
    return true;
  }
  return false;
}