import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CidadesListComponent } from './components/cidade/cidades-list/cidades-list.component';
import { HomePrincipalComponent } from './components/home-principal/home-principal.component';
import { PessoasListComponent } from './components/pessoa/pessoas-list/pessoas-list.component';


const routes: Routes = [
  {path: 'home', component:HomePrincipalComponent},
  {path: '', redirectTo:'/home', pathMatch: 'full'},
  {path:'cidades',component:CidadesListComponent},
  {path: 'pessoas',component:PessoasListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
