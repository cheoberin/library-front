import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherUpdateComponent } from './publisher-update.component';

describe('PublisherUpdateComponent', () => {
  let component: PublisherUpdateComponent;
  let fixture: ComponentFixture<PublisherUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublisherUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublisherUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
