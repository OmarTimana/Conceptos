import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPdfComponent } from './crear-pdf.component';

describe('CrearPdfComponent', () => {
  let component: CrearPdfComponent;
  let fixture: ComponentFixture<CrearPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearPdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
