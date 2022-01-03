import { TransferenciaService } from './../../services/transferencia.service';
import { Transferencia } from './../../services/Transferencia';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Cliente } from './../../services/cliente';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { runTransaction } from 'firebase/firestore';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  resultado!: Cliente;
  form!: FormGroup;
  transferencias!: Transferencia[];
  modal: boolean = false;
  clientes!: Cliente[];

  constructor(
    public authService: AuthService,
    private route: Router,
    private clienteService: ClienteService,
    private db: AngularFirestore,
    private transferenciasService: TransferenciaService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getClientes();
    this.authService.afAuth.currentUser.then((data: any) => {
      // acessar o email dentro do obj
      const email = data?.multiFactor.user.email;
      this.clienteService.getByEmail(email).subscribe((res: any) => {
        this.resultado = res[0];
        this.transferenciasService
          .getByContaOrigem(this.resultado.conta)
          .subscribe((transferencia: any) => {
            this.transferencias = transferencia;
          });
      });
    });

    this.form = this.fb.group({
      contaOrigem: '',
      contaDestino: '',
      valor: 0,
      flagSucesso: false,
      senha: '',
    });
  }

  getClientes() {
    this.clienteService.getClientList().subscribe((res) => {
      this.clientes = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as {}),
        } as Cliente;
      });
    });
  }

  onSubmit() {
    this.form.value['contaOrigem'] = this.resultado.conta;
    this.authService.reAuth(this.resultado.email, this.form.value.senha).then(
      (res) => {
        delete this.form.value.senha;
        if (this.form.value.valor <= this.resultado.saldo) {
          this.form.value.flagSucesso = true;
          this.transferenciasService.createTransferencia(this.form.value);
          this.clienteService.updateSaldo(this.resultado.conta, this.form.value.valor, true)
          this.clienteService.updateSaldo(this.form.value.contaDestino, this.form.value.valor, false)
        } else {
          console.log('Saldo Insuficiente');
        }

        this.form.reset();
        this.modal = false;
      },
      (err) => {
        console.log(err);
        console.log('senha incorreta');
      }
    );
  }
  mostraModal() {
    this.modal = true;
  }

  logout() {
    this.authService.doLogout();
    this.route.navigate(['/login']);
  }

  async transaction() {
    const saldoRef = <any>this.db.collection('clientes3').doc('id');
    await saldoRef.set({
      saldo: 0,
    });

    try {
      await this.db.firestore.runTransaction(async (t) => {
        const doc = <any>await t.get(saldoRef);
        const newSaldo = doc.data().saldo - this.form.value.valor;
        t.update(saldoRef, { saldo: newSaldo });
      });
      console.log('Transaction success!');
    } catch (e) {
      console.log('Transaction failure:', e);
    }
  }
}
