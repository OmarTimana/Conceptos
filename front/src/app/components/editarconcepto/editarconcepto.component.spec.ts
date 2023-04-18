import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarconceptoComponent } from './editarconcepto.component';

describe('EditarconceptoComponent', () => {
  let component: EditarconceptoComponent;
  let fixture: ComponentFixture<EditarconceptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarconceptoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarconceptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
