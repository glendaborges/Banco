import { TransferenciaService } from './../../services/transferencia.service';
import { Transferencia } from './../../services/Transferencia';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Cliente } from './../../services/cliente';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  resultado!: Cliente;
  form!: FormGroup;
  transferencias!: Transferencia[];
  conta!: Transferencia[];

  constructor(
    public authService: AuthService,
    private route: Router,
    private clienteService: ClienteService,
    private db: AngularFireDatabase,
    private transferenciasService: TransferenciaService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
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
      this.transferenciasService.getByContaDestino(this.resultado.conta).subscribe((conta: any)=>{
        this.conta = conta
      })
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

  onSubmit() {
    this.form.value['contaOrigem'] = this.resultado.conta;
    this.authService.reAuth(this.resultado.email, this.form.value.senha).then(
      (res) => {
        delete this.form.value.senha;
        if (this.form.value.valor <= this.resultado.saldo) {
          this.form.value.flagSucesso = true;
          this.transferenciasService.createTransferencia(this.form.value);
        } else {
          console.log('Saldo Insuficiente');
        }
        this.form.reset();
      },
      (err) => {
        console.log(err);
        console.log('senha incorreta');
      }
    );
  }
}
