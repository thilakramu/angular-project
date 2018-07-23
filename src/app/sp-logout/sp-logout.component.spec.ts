import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpLogoutComponent } from './sp-logout.component';

describe('SpLogoutComponent', () => {
  let component: SpLogoutComponent;
  let fixture: ComponentFixture<SpLogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpLogoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
