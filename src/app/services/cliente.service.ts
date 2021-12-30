import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Cliente } from './cliente';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor(private db: AngularFireDatabase) {}

  insert(cliente: Cliente) {
    this.db
      .list('cliente')
      .push(cliente)
      .then((res: any) => {
        console.log(res.key);
      });
  }

  getAll() {
    return this.db.list('cliente').snapshotChanges().pipe(
      map(changes =>{
        return changes.map(c =>({key: c.payload.key, ...c.payload.val() as {}}))
      })
    )
  }
}
