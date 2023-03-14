import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsCreateComponent } from './authors-create.component';

describe('AuthorsCreateComponent', () => {
  let component: AuthorsCreateComponent;
  let fixture: ComponentFixture<AuthorsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorsCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
