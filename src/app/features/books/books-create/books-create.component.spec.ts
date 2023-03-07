import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksCreateComponent } from './books-create.component';

describe('BooksCreateComponent', () => {
  let component: BooksCreateComponent;
  let fixture: ComponentFixture<BooksCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
