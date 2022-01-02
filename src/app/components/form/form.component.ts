
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/services/cliente';
import { FormGroup, FormBuilder, FormControl, Validators, ValidationErrors  } from '@angular/forms';

import { ClienteService } from 'src/app/services/cliente.service';
import { Router } from '@angular/router';
import { Validacoes } from 'src/app/validacoes';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form!: FormGroup

  cliente: Cliente = {
    id: '',
    agencia: '',
    conta: 0,
    nome: '',
    data: '',
    email: '',
    saldo: 0
  }
  constructor(private service:ClienteService, private router:Router,  private fb: FormBuilder, private  authService: AuthService) { }

  ngOnInit() {
    this.form = this.fb.group({
    agencia: [null],
    conta: [this.geraContaAleatoria()],
    nome: [
      '',
        Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])
    ],
    data: [
      '',
      Validators.compose([Validators.required, Validacoes.MaiorQue18Anos])
    ],
    email: ['', Validators.compose([Validators.email])],
    senha:  [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)
      ])

    ],
    saldo: 0

  })

  }

  geraContaAleatoria() {
    let numeroCaracteres = 7
    let ContaAleatoria = '';
    let caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < numeroCaracteres; i++) {
      ContaAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return ContaAleatoria;

}



  onSubmit(){
    this.authService.doRegister(this.form.value)
    delete this.form.value.senha
    this.form.value['id'] = this.form.value.conta
    this.service.createClient(this.form.value);
    this.form.reset();
    this.router.navigate(['/']);
  }

  get nome() {
    return this.form.get('nome');
  }

  get email() {
    return this.form.get('email');
  }
  get data() {
    return this.form.get('data');
  }

  get senha() {
    return this.form.get('senha');
  }

}
