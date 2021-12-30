import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Cliente } from './cliente';
import { map,  Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  clietes1!: Observable<any[]>;

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

  



  // getByEmail(email:string){
  //   this.db.object(`cliente/email/${email}`).valueChanges();
  // }


  getByEmail2(email:string){
    const query = this.db.list('cliente', (ref:any)=>{
     return ref.orderByChild("email").equalTo(email)
    }).snapshotChanges().pipe(
      map(changes =>{
        return changes.map(c =>({key: c.payload.key, ...c.payload.val() as {}}))
      })
    )
   
    return query
  }
}
