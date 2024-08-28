import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-principal',
  templateUrl: './home-principal.component.html',
  styleUrls: ['./home-principal.component.css']
})
export class HomePrincipalComponent implements OnInit, AfterViewInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const goToCitiesLink = document.getElementById('goToCities') as HTMLAnchorElement;
    const goToPeopleLink = document.getElementById('goToPeoples') as HTMLAnchorElement;

    if (goToCitiesLink) {
      goToCitiesLink.addEventListener('click', (event) => {
        event.preventDefault();
        this.router.navigate(['/cidades']);
      });
    }
     if (goToPeopleLink) {
      goToPeopleLink.addEventListener('click', (event) => {
        event.preventDefault();
        this.router.navigate(['/pessoas']);
      });
    }
  }
}
