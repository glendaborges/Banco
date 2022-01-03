import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Cliente } from './cliente';
import { map, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor(
    private db: AngularFireDatabase,
    private angularFirestore: AngularFirestore
  ) {}

  getClientDoc(id: any) {
    return this.angularFirestore.collection('cliente').doc(id).valueChanges();
  }

  getClientList() {
    return this.angularFirestore.collection('cliente').snapshotChanges();
  }

  createClient(cliente: Cliente) {
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
        .collection('cliente')
        .add(cliente)
        .then(
          (response) => {
            console.log(response);
          },
          (error) => reject(error)
        );
    });
  }

  getByEmail(email: string) {
    return this.angularFirestore
      .collection('cliente', (ref) => ref.where('email', '==', email))
      .valueChanges();
  }

  updateSaldo(conta: string, valor: number, flagSub: boolean) {
    const ORDER_ITEMS = this.angularFirestore.collection('cliente', (ref) =>
      ref.where('conta', '==', conta)
    );

    ORDER_ITEMS.get().subscribe((snapshots: any) => {
      if (snapshots.size > 0) {
        snapshots.forEach((orderItem: any) => {
          let novoSaldo = orderItem.data().saldo + valor;
          if (flagSub) {
            novoSaldo = orderItem.data().saldo - valor;
          }
          ORDER_ITEMS.doc(orderItem.id).update({ saldo: novoSaldo });
        });
      }
    });
  }
}
