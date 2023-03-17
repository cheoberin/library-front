import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenresUpdateComponent } from './genres-update.component';

describe('GenresUpdateComponent', () => {
  let component: GenresUpdateComponent;
  let fixture: ComponentFixture<GenresUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenresUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenresUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
