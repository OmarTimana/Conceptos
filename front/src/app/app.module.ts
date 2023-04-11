import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { CrearusuariosComponent } from './components/crearusuarios/crearusuarios.component';
import { CreardependenciaComponent } from './components/creardependencia/creardependencia.component';

import { PrincipalComponent } from './components/principal/principal.component';
import { ConceptoComponent } from './components/concepto/concepto.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { DocumentoComponent } from './components/documento/documento.component';
import { ModfabricanteComponent } from './components/modfabricante/modfabricante.component';
import { ModiscoComponent } from './components/modisco/modisco.component';
import { ModprocesadorComponent } from './components/modprocesador/modprocesador.component';
import { RefimpComponent } from './components/refimp/refimp.component';
import { ModrefpcComponent } from './components/modrefpc/modrefpc.component';
import { ModequipoComponent } from './components/modequipo/modequipo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';







@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    CrearusuariosComponent,
    CreardependenciaComponent,
    PrincipalComponent,
    ConceptoComponent,
    TablaComponent,
    DocumentoComponent,
    ModfabricanteComponent,
    ModiscoComponent,
    ModprocesadorComponent,
    RefimpComponent,
    ModrefpcComponent,
    ModequipoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
