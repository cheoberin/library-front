import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherReadComponent } from './publisher-read.component';

describe('PublisherReadComponent', () => {
  let component: PublisherReadComponent;
  let fixture: ComponentFixture<PublisherReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublisherReadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublisherReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
