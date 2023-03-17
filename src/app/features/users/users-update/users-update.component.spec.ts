import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersUpdateComponent } from './users-update.component';

describe('UsersUpdateComponent', () => {
  let component: UsersUpdateComponent;
  let fixture: ComponentFixture<UsersUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
