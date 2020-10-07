import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsDialogComponent } from './assets-dialog.component';

describe('AssetsDialogComponent', () => {
  let component: AssetsDialogComponent;
  let fixture: ComponentFixture<AssetsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
