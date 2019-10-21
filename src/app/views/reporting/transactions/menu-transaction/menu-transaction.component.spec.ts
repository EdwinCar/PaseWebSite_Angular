import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTransactionComponent } from './menu-transaction.component';

describe('MenuTransactionComponent', () => {
  let component: MenuTransactionComponent;
  let fixture: ComponentFixture<MenuTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
