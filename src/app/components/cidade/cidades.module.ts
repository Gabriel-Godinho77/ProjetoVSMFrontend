import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CidadesListComponent } from './cidades-list/cidades-list.component';
import { PoTableModule,PoModule } from '@po-ui/ng-components';
import { PoPageDynamicSearchModule } from '@po-ui/ng-templates';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CidadesListComponent],
  imports: [
    CommonModule,
    PoTableModule,
    PoPageDynamicSearchModule,
    HttpClientModule,
    PoModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CidadesListComponent
  ]
})
export class CidadesModule { }
