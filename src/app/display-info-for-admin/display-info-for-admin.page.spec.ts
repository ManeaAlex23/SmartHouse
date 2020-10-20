import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DisplayInfoForAdminPage } from './display-info-for-admin.page';

describe('DisplayInfoForAdminPage', () => {
  let component: DisplayInfoForAdminPage;
  let fixture: ComponentFixture<DisplayInfoForAdminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayInfoForAdminPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DisplayInfoForAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
