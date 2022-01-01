import { TransferenciaService } from './../../services/transferencia.service';
import { Transferencia } from './../../services/Transferencia';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Cliente } from './../../services/cliente';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ClienteService } from 'src/app/services/cliente.service';
;
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  resultado!: Cliente
  form!:FormGroup
  transferencia: Transferencia = {
    conta: '',
    valor: 0,
    saldo: 1000,
    senha: '',
    id:''
  }
  modal: boolean = false

  transferencias!: Transferencia[]

  constructor(public authService:AuthService, private route:Router, private clienteService:ClienteService, private db: AngularFireDatabase, private transferenciasService: TransferenciaService, private fb: FormBuilder) { }



  ngOnInit() {
    (this.authService.afAuth.currentUser).then((data:any )=>{
      // acessar o email dentro do obj
       const email = data?.multiFactor.user.email
       this.clienteService.getByEmail(email).subscribe((res:any) => {
         this.resultado = res[0]
       })
    })

    this.transferenciasService.getTransferenciaList().subscribe(res => {
      this.transferencias = res.map(e => {
      return {
        id: e.payload.doc.id,
        ...e.payload.doc.data() as {}
      } as Transferencia
    })
  })

    this.form = this.fb.group({
      conta: '',
      valor: 0,
      saldo: 0,
      senha: ''
    })
  }

  onSubmit(){
    this.transferenciasService.createTransferencia(this.form.value)
    this.form.reset()
    this.modal = false

  }

  mostraModal(){
    this.modal = true
  }

  logout(){
    this.authService.doLogout()
    this.route.navigate(['/login'])
  }

}
