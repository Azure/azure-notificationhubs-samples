import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationEventPage } from './registration-event.page';

describe('RegistrationEventPage', () => {
  let component: RegistrationEventPage;
  let fixture: ComponentFixture<RegistrationEventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationEventPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
