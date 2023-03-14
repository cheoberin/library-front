import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsReadComponent } from './authors-read.component';

describe('AuthorsReadComponent', () => {
  let component: AuthorsReadComponent;
  let fixture: ComponentFixture<AuthorsReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorsReadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorsReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
