import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { FaleConoscoComponent } from './fale-conosco/fale-conosco.component';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { PublicarComponent } from './publicar/publicar.component';
import { SobreNosComponent } from './sobre-nos/sobre-nos.component';
import { FormularioComponent } from './formulario/formulario.component';


const routes: Routes = [
  {path: "", component: IndexComponent},
  {path: "login", component: LoginComponent},
  {path: "cadastro", component: CadastroComponent},
  {path: "sobre", component: SobreNosComponent},
  {path: "contato", component: FaleConoscoComponent},
  {path: "home", component: HomeComponent},
  {path: "publicar", component: PublicarComponent},
  {path: "formulario", component: FormularioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
