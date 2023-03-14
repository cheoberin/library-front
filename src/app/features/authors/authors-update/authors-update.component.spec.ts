import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsUpdateComponent } from './authors-update.component';

describe('AuthorsUpdateComponent', () => {
  let component: AuthorsUpdateComponent;
  let fixture: ComponentFixture<AuthorsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorsUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
