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
  somaEntrada!: number;
  somaSaida!: number;

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
            this.somaSaida = transferencia
              .map((e: any) => e.valor)
              .reduce((a: any, b: any) => a + b, 0);
          });
        this.transferenciasService
          .getByContaDestino(this.resultado.conta)
          .subscribe((conta: any) => {
            this.conta = conta;
            this.somaEntrada = conta
              .map((e: any) => e.valor)
              .reduce((a: any, b: any) => a + b, 0);
          });
      });
    });
  }
}
