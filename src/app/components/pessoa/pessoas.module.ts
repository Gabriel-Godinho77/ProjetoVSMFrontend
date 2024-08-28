import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoasListComponent } from './pessoas-list/pessoas-list.component';
import { PoTableModule,PoModule } from '@po-ui/ng-components';
import { PoPageDynamicSearchModule } from '@po-ui/ng-templates';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PessoasListComponent],
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
    PessoasListComponent
  ]
})
export class PessoasModule { }
