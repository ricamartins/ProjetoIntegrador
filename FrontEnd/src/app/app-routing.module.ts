import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: "", component: IndexComponent},
  {path: "login", component: LoginComponent},
  {path: "cadastro", component: CadastroComponent},
  {path: "home", component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
