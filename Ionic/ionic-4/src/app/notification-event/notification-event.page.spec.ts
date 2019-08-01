import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationEventPage } from './notification-event.page';

describe('NotificationEventPage', () => {
  let component: NotificationEventPage;
  let fixture: ComponentFixture<NotificationEventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationEventPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
