import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CidadesListComponent } from './cidades-list.component';

describe('CidadesListComponent', () => {
  let component: CidadesListComponent;
  let fixture: ComponentFixture<CidadesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CidadesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CidadesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
