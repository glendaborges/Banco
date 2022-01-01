import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Transferencia } from './Transferencia';

@Injectable({
  providedIn: 'root'
})
export class TransferenciaService {

  constructor(private angularFireStore: AngularFirestore) { }

  createTransferencia(transferencia: Transferencia){
    return new Promise<any>((resolve, reject) => {
      this.angularFireStore
      .collection('tranferencias')
      .add(transferencia)
      .then(response => { console.log(response)}, error => reject(error))
    })
  }

  getTransferenciaList(){
    return this.angularFireStore
    .collection('transferencia')
    .snapshotChanges()
  }
}


