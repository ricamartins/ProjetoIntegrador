import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { FaleConoscoComponent } from './fale-conosco/fale-conosco.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { SobreNosComponent } from './sobre-nos/sobre-nos.component';

const routes: Routes = [
  {path: "", component: IndexComponent},
  {path: "login", component: LoginComponent},
  {path: "cadastro", component: CadastroComponent},
  {path: "sobre-nos", component: SobreNosComponent},
  {path: "contato", component: FaleConoscoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
