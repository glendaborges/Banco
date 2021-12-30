import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import  firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(public afAuth: AngularFireAuth) { }

doRegister(value:any){
  return new Promise<any>((resolve, reject) => {
    firebase.auth().createUserWithEmailAndPassword(value.email, value.senha)
    .then((res:any )=> {
      resolve(res);
    },( err:any) => reject(err))
  })
}
doLogin(value:any){
  return new Promise<any>((resolve, reject) => {
    firebase.auth().signInWithEmailAndPassword(value.email, value.password)
    .then((res:any )=> {
      resolve(res);
    },( err:any) => reject(err))
  })
}
doLogout(){
  return new Promise<any>((resolve, reject) => {
    firebase.auth().signOut()
    .then((res:any )=> {
      resolve(res);
    },( err:any) => reject(err))
  })
}

}
