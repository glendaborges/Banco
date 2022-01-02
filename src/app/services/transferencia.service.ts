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

  getClientDoc(id:any) {
    return this.angularFireStore
    .collection('tranferencias')
    .doc(id)
    .valueChanges()
  }

  getTransferenciaList(){
    return this.angularFireStore
    .collection('tranferencias')
    .snapshotChanges()
  }

  getByContaOrigem(contaOrigem:string){
    return this.angularFireStore
    .collection('tranferencias', (ref)=> ref.where('contaOrigem', '==', contaOrigem).where('flagSucesso','==', true)).valueChanges()
  }

  getByContaDestino(contaOrigem:string){
    return this.angularFireStore
    .collection('tranferencias', (ref)=> ref.where('contaDestino', '==', contaOrigem)).valueChanges()
  }

}


