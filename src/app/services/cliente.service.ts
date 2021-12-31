import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Cliente } from './cliente';
import { map,  Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root',
})
export class ClienteService {


  constructor(private db: AngularFireDatabase, private angularFirestore: AngularFirestore) {}

  getClientDoc(id:any) {
    return this.angularFirestore
    .collection('cliente3')
    .doc(id)
    .valueChanges()
  }

  getClientList() {
    return this.angularFirestore
    .collection("cliente3")
    .snapshotChanges();
  }

  createClient(cliente: Cliente) {
    return new Promise<any>((resolve, reject) =>{
      this.angularFirestore
        .collection("cliente3")
        .add(cliente)
        .then(response => { console.log(response) }, error => reject(error));
    });
  }


  getByEmail(email:string){
    return this.angularFirestore
    .collection('cliente3', (ref)=> ref.where('email', '==', email)).valueChanges()
  }
}
