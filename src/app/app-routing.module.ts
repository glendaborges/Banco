import { ListComponent } from './components/list/list.component';
import { FormComponent } from './components/form/form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path:'cadastro', component:FormComponent},
  {path:'', component:ListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
