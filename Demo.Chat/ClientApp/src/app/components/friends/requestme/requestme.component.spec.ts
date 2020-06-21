import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestmeComponent } from './requestme.component';

describe('RequestmeComponent', () => {
  let component: RequestmeComponent;
  let fixture: ComponentFixture<RequestmeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestmeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
