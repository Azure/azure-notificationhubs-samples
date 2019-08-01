import { TestBed } from '@angular/core/testing';

import { AzureNotificationHubsService } from './azure-notification-hubs.service';

describe('AzureNotificationHubsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AzureNotificationHubsService = TestBed.get(AzureNotificationHubsService);
    expect(service).toBeTruthy();
  });
});
