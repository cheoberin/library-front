import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksUpdateComponent } from './books-update.component';

describe('BooksUpdateComponent', () => {
  let component: BooksUpdateComponent;
  let fixture: ComponentFixture<BooksUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
