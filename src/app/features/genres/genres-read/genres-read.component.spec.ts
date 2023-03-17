import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenresReadComponent } from './genres-read.component';

describe('GenresReadComponent', () => {
  let component: GenresReadComponent;
  let fixture: ComponentFixture<GenresReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenresReadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenresReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
