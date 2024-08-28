import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule } from '@po-ui/ng-components';
import { PoPageLoginModule, PoTemplatesModule } from '@po-ui/ng-templates';
import { RouterModule } from '@angular/router';
import { CidadesModule } from './components/cidade/cidades.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomePrincipalComponent } from './components/home-principal/home-principal.component';
import { PessoasModule } from './components/pessoa/pessoas.module';


@NgModule({
  declarations: [
    AppComponent,
    HomePrincipalComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    RouterModule.forRoot([]),
    PoPageLoginModule,
    PoTemplatesModule,
    ReactiveFormsModule,
    FormsModule,
    CidadesModule,
    PessoasModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
