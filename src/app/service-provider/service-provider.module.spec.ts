import { ServiceProviderModule } from './service-provider.module';

describe('ServiceProviderModule', () => {
  let serviceProviderModule: ServiceProviderModule;

  beforeEach(() => {
    serviceProviderModule = new ServiceProviderModule();
  });

  it('should create an instance', () => {
    expect(serviceProviderModule).toBeTruthy();
  });
});
