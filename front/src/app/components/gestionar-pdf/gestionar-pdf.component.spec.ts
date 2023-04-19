import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarPdfComponent } from './gestionar-pdf.component';

describe('GestionarPdfComponent', () => {
  let component: GestionarPdfComponent;
  let fixture: ComponentFixture<GestionarPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarPdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionarPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
