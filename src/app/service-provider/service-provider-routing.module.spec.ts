import { ServiceProviderRoutingModule } from './service-provider-routing.module';

describe('ServiceProviderRoutingModule', () => {
  let serviceProviderRoutingModule: ServiceProviderRoutingModule;

  beforeEach(() => {
    serviceProviderRoutingModule = new ServiceProviderRoutingModule();
  });

  it('should create an instance', () => {
    expect(serviceProviderRoutingModule).toBeTruthy();
  });
});
