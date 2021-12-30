
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/services/cliente';
import { FormGroup, FormBuilder, FormControl, Validators, ValidationErrors  } from '@angular/forms';
import { ClienteDataService } from 'src/app/services/cliente-data.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router } from '@angular/router';
import { Validacoes } from 'src/app/validacoes';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form!: FormGroup

  cliente: Cliente = {
    agencia: '',
    conta: 0,
    nome: '',
    data: '',
    email: '',
    senha: '',

  }
  key:string =''
  numero:any

  constructor(private service:ClienteService, private router:Router,  private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
    agencia: [null],
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

    ]

  })
    // this.cliente = new Cliente

  }

  teste(){
    console.log(this.form.controls['nome'].errors)
  }

  onSubmit(){
    this.service.insert(this.form.value)
    this.cliente = new Cliente
    this.form.reset();
    this.router.navigate(['/'])
    console.log(this.form.controls['nome'].errors)
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
