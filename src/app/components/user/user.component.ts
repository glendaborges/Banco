import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente} from 'src/app/services/cliente';
;
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  resultado!: []

  constructor(public authService:AuthService, private route:Router, private clienteService:ClienteService, private db: AngularFireDatabase ) { 
    
  }

  

  ngOnInit() {

      this.db.object('cliente').valueChanges().subscribe(val => console.log(val))
    
    // (this.authService.afAuth.currentUser).then((data:any )=>{
    //   // acessar o email dentro do obj 
    //    const email = data?.multiFactor.user.email
    //   this.resultado = <any>this.clienteService.getByEmail(email)
    //   console.log(this.resultado)

    // })
  }
  logout(){
    this.authService.doLogout()
    this.route.navigate(['/login'])
  }

}
