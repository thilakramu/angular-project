import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmwareHistoryComponent } from './firmware-history.component';

describe('FirmwareHistoryComponent', () => {
  let component: FirmwareHistoryComponent;
  let fixture: ComponentFixture<FirmwareHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmwareHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmwareHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
