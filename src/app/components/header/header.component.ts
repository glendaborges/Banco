import { Transferencia } from './../../services/Transferencia';
import { TransferenciaService } from './../../services/transferencia.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ClienteService } from './../../services/cliente.service';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  form!: FormGroup;
  modal: boolean = false;
  transferencias!: Transferencia[]

  constructor(
    public authService: AuthService,
    private router: Router,
    private clienteService: ClienteService,
    private db: AngularFireDatabase,
    private transferenciasService: TransferenciaService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      conta: '',
      valor: 0,
      saldo: 0,
      senha: '',
    });
  }

  onSubmit() {
    this.transferenciasService.createTransferencia(this.form.value);
    this.form.reset();
    this.modal = false;
  }

  mostraModal() {
    this.modal = true;
  }

  logout() {
    this.authService.doLogout();
    this.router.navigate(['/login']);
  }
}
