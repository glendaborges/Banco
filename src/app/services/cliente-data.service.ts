import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cliente } from './cliente';
@Injectable({
  providedIn: 'root',
})
export class ClienteDataService {
  private clienteSource = new BehaviorSubject({ cliente: {}, key: '' });
  currentContato = this.clienteSource.asObservable();

  constructor() {}

  changeContato(cliente: Cliente, key: string) {
    this.clienteSource.next({ cliente: cliente, key: key });
  }
}
