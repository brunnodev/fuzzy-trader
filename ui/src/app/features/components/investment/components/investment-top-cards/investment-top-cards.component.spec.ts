import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentTopCardsComponent } from './investment-top-cards.component';

describe('InvestmentTopCardsComponent', () => {
  let component: InvestmentTopCardsComponent;
  let fixture: ComponentFixture<InvestmentTopCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestmentTopCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentTopCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
