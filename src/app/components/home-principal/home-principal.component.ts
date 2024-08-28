import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-home-principal',
  templateUrl: './home-principal.component.html',
  styleUrls: ['./home-principal.component.css']
})
export class HomePrincipalComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  readonly menus: Array<PoMenuItem> = [

    { label: 'Pessoas', action: this.navegarPessoas.bind(this), icon: 'po-icon-device-desktop'  },
    { label: 'Cidades', action: this.navegarCidades.bind(this), icon: 'po-icon-device-desktop'  }
  ];


  private navegarPessoas(){
    this.router.navigateByUrl('/pessoas')
  }

  private navegarCidades(){
    this.router.navigateByUrl('/cidades')
  }
}
