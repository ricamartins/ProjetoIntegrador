import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FooterComponent } from './footer/footer.component';
import { SobreNosComponent } from './sobre-nos/sobre-nos.component';
import { IndexComponent } from './index/index.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { FormsModule } from '@angular/forms';
import { FaleConoscoComponent } from './fale-conosco/fale-conosco.component';
import { HomeComponent } from './home/home.component';
import { PublicarComponent } from './publicar/publicar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EditarPostComponent } from './editar-post/editar-post.component';
import { FormularioComponent } from './formulario/formulario.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SobreNosComponent,
    IndexComponent,
    LoginComponent,
    CadastroComponent,
    FaleConoscoComponent,
    HomeComponent,
    PublicarComponent,
    EditarPostComponent,
    FormularioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
