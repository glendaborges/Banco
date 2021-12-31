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

  constructor(public authService:AuthService, private route:Router, private clienteService:ClienteService, private db: AngularFireDatabase ) { 
    
  }

  

  ngOnInit() {
    (this.authService.afAuth.currentUser).then((data:any )=>{
      // acessar o email dentro do obj 
       const email = data?.multiFactor.user.email
       this.clienteService.getByEmail(email).subscribe((res:any) => {
         this.resultado = res[0]
       })

    })
  }
  logout(){
    this.authService.doLogout()
    this.route.navigate(['/login'])
  }

}
