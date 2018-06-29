import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartContractPageComponent } from './smart-contract-page.component';

describe('SmartContractPageComponent', () => {
  let component: SmartContractPageComponent;
  let fixture: ComponentFixture<SmartContractPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartContractPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartContractPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
