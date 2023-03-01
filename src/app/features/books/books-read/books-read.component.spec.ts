import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksReadComponent } from './books-read.component';

describe('BooksReadComponent', () => {
  let component: BooksReadComponent;
  let fixture: ComponentFixture<BooksReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksReadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
