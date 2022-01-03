import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/services/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { ClienteDataService } from 'src/app/services/cliente-data.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  clientes!: Cliente[];

  constructor(
    private service: ClienteService,
    private data: ClienteDataService
  ) {}

  ngOnInit() {
    this.service.getClientList().subscribe((res) => {
      this.clientes = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as {}),
        } as Cliente;
      });
    });

    
  }
}
